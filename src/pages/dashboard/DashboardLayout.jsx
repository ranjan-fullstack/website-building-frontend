import { useState } from "react";
import Icon from "../../components/ui/Icon";
import Logo from "../../components/ui/Logo";

export const PanelHeading = ({ kicker, title, text, action }) => (
  <div className="wm-panel-heading">
    <div>
      {kicker ? <p className="wm-eyebrow">{kicker}</p> : null}
      <h1>{title}</h1>
      {text ? <p>{text}</p> : null}
    </div>
    {action || null}
  </div>
);

const DashboardLayout = ({ tabs, activeTab, user, onLogout, children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const activeLabel = tabs.find((tab) => tab.id === activeTab)?.label || "Dashboard";

  return (
    <div className="wm-dash">
      <a className="wm-skip-link" href="#main-content">
        Skip to main content
      </a>

      <aside className={`wm-dash-sidebar ${navOpen ? "open" : ""}`} aria-label="Dashboard">
        <Logo inverse href="/" />

        <nav className="wm-dash-nav" aria-label="Dashboard sections">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={tab.href}
              className={activeTab === tab.id ? "active" : ""}
              aria-current={activeTab === tab.id ? "page" : undefined}
              onClick={() => setNavOpen(false)}
            >
              <Icon name={tab.icon || "layout"} size={18} />
              {tab.label}
            </a>
          ))}
        </nav>

        <div className="wm-dash-sidebar-foot">
          <a href="/">Back to website</a>
          <button type="button" onClick={onLogout}>
            Sign out
          </button>
        </div>
      </aside>

      {navOpen ? (
        <button className="wm-dash-scrim" type="button" aria-label="Close menu" onClick={() => setNavOpen(false)} />
      ) : null}

      <div className="wm-dash-main">
        <header className="wm-dash-topbar">
          <button
            className="wm-dash-menu"
            type="button"
            aria-label="Open menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((open) => !open)}
          >
            ☰
          </button>
          <span className="wm-dash-topbar-title">{activeLabel}</span>
          <div className="wm-dash-profile">
            <span className={`wm-badge ${user.role === "admin" ? "wm-badge-purple" : "wm-badge-blue"}`}>
              {user.role}
            </span>
            {user.avatar ? <img src={user.avatar} alt="" referrerPolicy="no-referrer" /> : null}
            <span className="wm-dash-profile-name">{user.name}</span>
          </div>
        </header>

        <main id="main-content" className="wm-dash-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
