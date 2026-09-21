import { freeTemplatePrompts } from "./templateData";
import { templateCategories } from "./site";

// Presentation metadata for each template. `accent` / `accentSoft` describe the
// TEMPLATE'S own demo look (customer branding), not the Appzet Web Solution platform colours.
const catalogMeta = {
  "local-business": { categories: ["Local Business", "Services"], accent: "#0f766e", accentSoft: "#ccfbf1" },
  gym: { categories: ["Gym"], accent: "#b91c1c", accentSoft: "#fee2e2" },
  coaching: { categories: ["Coaching", "Education"], accent: "#1d4ed8", accentSoft: "#dbeafe" },
  architect: { categories: ["Portfolio", "Real Estate"], accent: "#44403c", accentSoft: "#e7e5e4" },
  "mobile-shop": { categories: ["Local Business"], accent: "#4338ca", accentSoft: "#e0e7ff" },
  "cosmetic-shop": { categories: ["Salon", "Local Business"], accent: "#be185d", accentSoft: "#fce7f3" },
  "hardware-shop": { categories: ["Local Business"], accent: "#c2410c", accentSoft: "#ffedd5" },
  "tiles-shop": { categories: ["Local Business", "Real Estate"], accent: "#a16207", accentSoft: "#fef3c7" },
  "electronics-shop": { categories: ["Local Business"], accent: "#0369a1", accentSoft: "#e0f2fe" },
  "medical-clinic": { categories: ["Healthcare"], accent: "#047857", accentSoft: "#d1fae5" },
};

const fallbackMeta = { categories: ["Local Business"], accent: "#475569", accentSoft: "#e2e8f0" };

export const templateCatalog = freeTemplatePrompts.map((template) => ({
  ...template,
  ...(catalogMeta[template.slug] || fallbackMeta),
}));

// Only offer filters that actually contain templates.
export const availableCategories = templateCategories.filter(
  (category) =>
    category === "All" ||
    templateCatalog.some((template) => template.categories.includes(category))
);
