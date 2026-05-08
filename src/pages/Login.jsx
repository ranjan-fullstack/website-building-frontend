import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/useAuth";
import { apiRequest } from "../services/api";
import "../styles/Auth.css";

const GOOGLE_SCRIPT_ID = "google-identity-services";

const loadGoogleScript = () =>
  new Promise((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);

    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });

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

  return `https://wa.me/917995590740?text=${message}`;
};

const Login = () => {
  const googleButtonRef = useRef(null);
  const { isAuthenticated, loginWithGoogleCredential, logout, user } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || !googleButtonRef.current) {
      return;
    }

    let isMounted = true;

    loadGoogleScript()
      .then(() => {
        if (!isMounted || !window.google) {
          return;
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          login_hint: email.trim() || undefined,
          callback: async (response) => {
            try {
              const loggedInUser = await loginWithGoogleCredential(response.credential);

              if (
                email.trim() &&
                loggedInUser.email.toLowerCase() !== email.trim().toLowerCase()
              ) {
                setMessage(`Signed in as ${loggedInUser.email}.`);
              } else {
                setMessage(`Welcome, ${loggedInUser.name}.`);
              }

              const pendingLead = getPendingWhatsAppLead();

              if (pendingLead) {
                await apiRequest("/orders", {
                  method: "POST",
                  body: JSON.stringify({
                    name: loggedInUser.name,
                    phone: "Not provided",
                    template: pendingLead.templateTitle,
                  }),
                });

                window.localStorage.removeItem("webmitra_pending_whatsapp");
                window.location.href = getWhatsAppHref(pendingLead.siteName);
                return;
              }

              window.location.hash = "#/dashboard";
            } catch (error) {
              setMessage(error.message || "Google sign-in failed. Please try again.");
            }
          },
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          shape: "pill",
          text: "continue_with",
          width: 280,
        });
      })
      .catch(() => {
        setMessage("Could not load Google sign-in. Check your internet connection.");
      });

    return () => {
      isMounted = false;
    };
  }, [clientId, email, loginWithGoogleCredential]);

  return (
    <main className="auth-page">
      <section className="auth-card">
        <a className="auth-back" href="#/">
          Back to home
        </a>

        <div className="auth-grid">
          <div className="auth-copy">
            <p className="auth-kicker">WebMitra account</p>
            <h1>Continue with Google and start building faster</h1>
            <p>
              WebMitra uses the official Google Sign-In button. We receive only
              your verified profile details, never your Google password.
            </p>
            <div className="auth-proof-row">
              <span>Official Google Sign-In</span>
              <span>Project tracking</span>
              <span>HTTPS protected</span>
            </div>
          </div>

          <div className="auth-panel">
            <div className="auth-panel-top">
              <div className="auth-logo">WM</div>
              <span className="auth-secure-pill">Secure sign in</span>
            </div>
            <h2>Sign in to WebMitra</h2>
            <p>Use your own Google account for project updates and support.</p>

            {!clientId ? (
              <div className="auth-warning">
                Google Sign-In is temporarily unavailable. Please contact
                WebMitra support for account help.
              </div>
            ) : isAuthenticated ? (
              <div className="auth-user-card">
                {user.avatar ? <img src={user.avatar} alt={user.name} /> : null}
                <div>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </div>
                <a
                  className="auth-button"
                  href="#/dashboard"
                >
                  Open dashboard
                </a>
                <button className="auth-button secondary" type="button" onClick={logout}>
                  Sign out
                </button>
              </div>
            ) : (
              <form className="auth-login-form" onSubmit={(event) => event.preventDefault()}>
                <label className="auth-field">
                  Google account email
                  <input
                    type="email"
                    value={email}
                    placeholder="you@gmail.com"
                    autoComplete="username"
                    inputMode="email"
                    name="username"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>
                <p className="auth-helper">
                  Optional: enter your Google account email to prefill the official
                  Google Sign-In prompt.
                </p>
                <div className="google-button-wrap" ref={googleButtonRef} />
                <p className="auth-small-print">
                  Do not enter your Google password on WebMitra. Authentication
                  happens only through Google&apos;s secure sign-in window.
                </p>
              </form>
            )}

            {message ? <p className="auth-message">{message}</p> : null}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
