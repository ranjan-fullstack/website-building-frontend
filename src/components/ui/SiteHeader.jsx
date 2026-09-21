import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { mainNav } from "../../data/site";
import Logo from "./Logo";

const SiteHeader = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="wm-header">
      <a className="wm-skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="wm-header-inner">
        <Logo />

        <nav className="wm-nav" aria-label="Main">
          {mainNav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="wm-header-actions">
          {isAuthenticated ? (
            <>
              <a className="wm-account" href="#/dashboard">
                {user?.avatar ? <img src={user.avatar} alt="" referrerPolicy="no-referrer" /> : null}
                <span>{user?.name || "My account"}</span>
              </a>
              <button className="wm-btn wm-btn-ghost" type="button" onClick={logout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <a className="wm-btn wm-btn-ghost" href="/login">
                Login
              </a>
              <a className="wm-btn wm-btn-primary" href="/templates">
                Get Started
              </a>
            </>
          )}
        </div>

        <button
          className="wm-menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="wm-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      <nav id="wm-mobile-menu" className={`wm-mobile-menu ${open ? "open" : ""}`} aria-label="Mobile">
        {mainNav.map((item) => (
          <a key={item.href} href={item.href} onClick={close}>
            {item.label}
          </a>
        ))}
        {isAuthenticated ? (
          <>
            <a href="#/dashboard" onClick={close}>
              Dashboard
            </a>
            <button className="wm-btn wm-btn-secondary" type="button" onClick={logout}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <a href="/login" onClick={close}>
              Login
            </a>
            <a className="wm-btn wm-btn-primary" href="/templates" onClick={close}>
              Get Started
            </a>
          </>
        )}
      </nav>
    </header>
  );
};

export default SiteHeader;
