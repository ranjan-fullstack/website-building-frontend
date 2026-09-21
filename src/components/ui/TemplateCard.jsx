import { useAuth } from "../../context/useAuth";

const TemplateCard = ({ template, basePath = "/templates" }) => {
  const { isAuthenticated } = useAuth();
  const demoHref = `${basePath}/${template.slug}`;
  // Signed-in customers pick a template inside the dashboard; visitors start from the public preview.
  const useHref = isAuthenticated && basePath === "/templates" ? `#/dashboard/templates/${template.slug}` : demoHref;
  const sample = template.sample || {};

  return (
    <article className="wm-template-card">
      <a className="wm-template-preview" href={demoHref} tabIndex={-1} aria-hidden="true">
        <div
          className="wm-template-mock"
          style={{ "--mock-accent": template.accent, "--mock-soft": template.accentSoft }}
        >
          <div className="wm-mock-bar">
            <i />
            <i />
            <i />
          </div>
          <div className="wm-mock-hero">
            <b>{sample.businessName || template.title}</b>
            <span>{sample.hero}</span>
            <em>{template.cta}</em>
          </div>
          <div className="wm-mock-cards">
            <i />
            <i />
            <i />
          </div>
        </div>
      </a>

      <div className="wm-template-body">
        <span className="wm-badge wm-badge-purple">{template.categories[0]}</span>
        <h3>{template.title}</h3>
        <p>{template.intro}</p>
        <div className="wm-template-actions">
          <a className="wm-btn wm-btn-secondary wm-btn-sm" href={demoHref}>
            View Demo
          </a>
          <a className="wm-btn wm-btn-primary wm-btn-sm" href={useHref}>
            Use This Template
          </a>
        </div>
      </div>
    </article>
  );
};

export default TemplateCard;
