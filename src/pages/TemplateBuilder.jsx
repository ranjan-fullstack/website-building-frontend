import { useMemo, useState } from "react";
import "../styles/ui.css";
import "../styles/Marketing.css";
import TemplateCard from "../components/ui/TemplateCard";
import EmptyState from "../components/ui/EmptyState";
import SiteFooter from "../components/ui/SiteFooter";
import SiteHeader from "../components/ui/SiteHeader";
import { availableCategories, templateCatalog } from "../data/templateCatalog";

const TemplateBuilder = ({ basePath = "/templates", embedded = false }) => {
  // The dashboard passes a hash path ("#/dashboard/templates"); public pages use "/templates".
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const visibleTemplates = useMemo(() => {
    const search = query.trim().toLowerCase();

    return templateCatalog.filter((template) => {
      const matchesCategory = category === "All" || template.categories.includes(category);
      const matchesSearch =
        !search ||
        `${template.title} ${template.intro} ${template.categories.join(" ")}`
          .toLowerCase()
          .includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  const gallery = (
    <section className="wm-gallery" aria-labelledby="gallery-heading">
      <p className="wm-eyebrow">Template gallery</p>
      <h1 id="gallery-heading" className="wm-h2">
        Pick a design made for your kind of business
      </h1>
      <p className="wm-lead">
        Preview how your website could look, then choose a template. We customise it with your
        business details and take it live.
      </p>

      <div className="wm-gallery-tools">
        <div className="wm-chips" role="group" aria-label="Filter by category">
          {availableCategories.map((item) => (
            <button
              key={item}
              type="button"
              className={`wm-chip ${category === item ? "active" : ""}`}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="wm-field wm-gallery-search">
          <label htmlFor="template-search">Search templates</label>
          <input
            id="template-search"
            className="wm-input"
            type="search"
            placeholder="e.g. clinic, gym, shop"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      {visibleTemplates.length ? (
        <div className="wm-template-grid">
          {visibleTemplates.map((template) => (
            <TemplateCard key={template.slug} template={template} basePath={basePath} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No templates match your search"
          text="Try a different category or clear the search box."
          actionLabel="Show all templates"
          onAction={() => {
            setCategory("All");
            setQuery("");
          }}
        />
      )}
    </section>
  );

  if (embedded) {
    return <div className="template-builder-embedded wm-page">{gallery}</div>;
  }

  return (
    <div className="wm-page">
      <SiteHeader />
      <main id="main-content" className="wm-container wm-section">
        {gallery}
      </main>
      <SiteFooter />
    </div>
  );
};

export default TemplateBuilder;
