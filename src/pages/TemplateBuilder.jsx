import "../styles/Template.css";
import { freeTemplatePrompts } from "../data/templateData";

const TemplateBuilder = ({ basePath = "#/templates", embedded = false }) => {
  return (
    <div className={embedded ? "template-builder-embedded" : "home-page"}>
      {/* HEADER */}
      {!embedded ? (
        <header className="header">
          <div className="brand-mark">
            <div className="brand-badge">WM</div>
            <div>
              <p className="brand-name">WebMitra</p>
              <span className="brand-subtitle">
                Choose a template for your business
              </span>
            </div>
          </div>

          <nav className="nav-links">
            <a href="#/">Home</a>
            <a href="#/templates">Templates</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <a className="btn btn-primary" href="#/">
            Back to Home
          </a>
        </header>
      ) : null}

      {/* MAIN */}
      <main>
        <section className="builder-flow builder-page">
          <p className="section-kicker">Choose your template</p>

          <h2>Pick a design and preview your business website</h2>

          <p className="pricing-intro">
            Select a template based on your business type. Preview how your
            website will look, then contact us on WhatsApp to make it live for
            your shop.
          </p>

          {/* TEMPLATE CARDS */}
          <div className="cards two-column free-template-grid template-gallery-grid">
            {freeTemplatePrompts.map((template) => (
              <article
                className="free-template-card template-gallery-card"
                key={template.slug}
              >
                <div className="free-template-top">
                  <h4>{template.title}</h4>
                  <span>{template.cta}</span>
                </div>

                <p>{template.intro}</p>

                <p>
                  <strong>Sections:</strong> {template.sections}
                </p>

                <p>
                  <strong>Editable:</strong> {template.editable}
                </p>

                <div className="template-gallery-actions">
                  {/* ONLY ONE CLEAR ACTION */}
                  <a
                    className="btn btn-primary"
                    href={`${basePath}/${template.slug}`}
                  >
                    Preview This Template
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TemplateBuilder;
