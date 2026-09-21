import { useEffect, useState } from "react";
import "../styles/ui.css";
import "../styles/Auth.css";
import { useAuth } from "../context/useAuth";
import { whatsappLink } from "../data/site";
import LogoMark from "../components/ui/LogoMark";
import { apiRequest } from "../services/api";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const getPendingWhatsAppLead = () => {
  try {
    const storedLead = window.localStorage.getItem("webmitra_pending_whatsapp");
    return storedLead ? JSON.parse(storedLead) : null;
  } catch (error) {
    console.error("Unable to read pending WhatsApp lead", error);
    return null;
  }
};

const getWhatsAppHref = (siteName) => {
  const message = encodeURIComponent(
    `Hi, I saw the ${siteName} website template preview and want to create a website for my business.`
  );

  return whatsappLink.split("?")[0] + `?text=${message}`;
};

const getQueryParam = (hash, key) => {
  const queryString = (hash || "").split("?")[1] || "";
  return new URLSearchParams(queryString).get(key) || "";
};

const getInitials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

const validate = (mode, values) => {
  const errors = {};

  if (mode === "register" && values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Please enter your password.";
  } else if (mode === "register" && values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
};

const Login = ({ hash }) => {
  const { isAuthenticated, login, register, logout, user } = useAuth();
  const [mode, setMode] = useState(() =>
    getQueryParam(hash, "mode") === "register" ? "register" : "login"
  );
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [clientBranding, setClientBranding] = useState(null);
  const slug = getQueryParam(hash, "from");
  const activeBranding = slug ? clientBranding : null;
  const isRegister = mode === "register";

  useEffect(() => {
    if (!slug) {
      return;
    }

    let isCancelled = false;

    apiRequest(`/public/${slug}`)
      .then((data) => {
        if (!isCancelled && data?.name) {
          setClientBranding({ name: data.name, initials: getInitials(data.name) });
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setClientBranding(null);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  const updateValue = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setErrors({});
    setFormError("");
  };

  const finishLogin = async (signedInUser) => {
    const pendingLead = getPendingWhatsAppLead();

    if (pendingLead) {
      try {
        await apiRequest("/orders", {
          method: "POST",
          body: JSON.stringify({
            name: signedInUser.name,
            phone: "Not provided",
            template: pendingLead.templateTitle,
          }),
        });
        window.localStorage.removeItem("webmitra_pending_whatsapp");
        window.location.href = getWhatsAppHref(pendingLead.siteName);
        return;
      } catch (error) {
        console.error("Unable to save pending lead", error);
      }
    }

    window.location.hash = "#/dashboard";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const nextErrors = validate(mode, values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    setSubmitting(true);

    try {
      const signedInUser = isRegister
        ? await register(values.name.trim(), values.email.trim(), values.password)
        : await login(values.email.trim(), values.password);

      await finishLogin(signedInUser);
    } catch (error) {
      setFormError(error.message || "We could not sign you in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const brandName = activeBranding ? activeBranding.name : "Appzet Web Solution";

  return (
    <main className="auth-page">
      <div className="auth-card">
        {activeBranding ? (
          <div className="auth-logo" aria-hidden="true">
            {activeBranding.initials}
          </div>
        ) : (
          <LogoMark size={64} />
        )}

        {isAuthenticated ? (
          <>
            <h1>You are signed in</h1>
            <div className="auth-user-card">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
              <a className="auth-button" href="#/dashboard">
                Open dashboard
              </a>
              <button className="auth-button secondary" type="button" onClick={logout}>
                Sign out
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>{isRegister ? `Create your ${brandName} account` : `Sign in to ${brandName}`}</h1>
            <p className="auth-sub">
              {isRegister
                ? "Create an account to choose a template and track your website."
                : "Sign in to track your website and get support."}
            </p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {isRegister ? (
                <div className="wm-field">
                  <label htmlFor="auth-name">Full name</label>
                  <input
                    id="auth-name"
                    className="wm-input"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    disabled={submitting}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "auth-name-error" : undefined}
                    onChange={(event) => updateValue("name", event.target.value)}
                  />
                  {errors.name ? (
                    <span className="wm-field-error" id="auth-name-error">
                      {errors.name}
                    </span>
                  ) : null}
                </div>
              ) : null}

              <div className="wm-field">
                <label htmlFor="auth-email">Email</label>
                <input
                  id="auth-email"
                  className="wm-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={values.email}
                  disabled={submitting}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "auth-email-error" : undefined}
                  onChange={(event) => updateValue("email", event.target.value)}
                />
                {errors.email ? (
                  <span className="wm-field-error" id="auth-email-error">
                    {errors.email}
                  </span>
                ) : null}
              </div>

              <div className="wm-field">
                <label htmlFor="auth-password">Password</label>
                <div className="auth-password">
                  <input
                    id="auth-password"
                    className="wm-input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete={isRegister ? "new-password" : "current-password"}
                    value={values.password}
                    disabled={submitting}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? "auth-password-error" : isRegister ? "auth-password-help" : undefined}
                    onChange={(event) => updateValue("password", event.target.value)}
                  />
                  <button
                    className="auth-toggle"
                    type="button"
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password ? (
                  <span className="wm-field-error" id="auth-password-error">
                    {errors.password}
                  </span>
                ) : isRegister ? (
                  <span className="wm-help" id="auth-password-help">
                    At least 8 characters.
                  </span>
                ) : null}
              </div>

              {formError ? (
                <p className="wm-alert wm-alert-error" role="alert">
                  {formError}
                </p>
              ) : null}

              <button className="wm-btn wm-btn-primary wm-btn-lg auth-submit" type="submit" disabled={submitting}>
                {submitting ? "Please wait..." : isRegister ? "Create account" : "Sign in"}
              </button>
            </form>

            <p className="auth-switch">
              {isRegister ? "Already have an account?" : "New to Appzet Web Solution?"}{" "}
              <button type="button" onClick={() => switchMode(isRegister ? "login" : "register")}>
                {isRegister ? "Sign in" : "Create an account"}
              </button>
            </p>
          </>
        )}

        <a className="auth-back" href="/">
          Back to home
        </a>
      </div>
    </main>
  );
};

export default Login;
