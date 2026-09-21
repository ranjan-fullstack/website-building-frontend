import { academy } from "./academyContent";

/*
  Multi-tenant client site architecture (incremental):

    Tenant (Client, matched by /c/:slug)
      -> Website configuration   (getSiteConfig)
        -> Template              (which section components render)
          -> Theme               (customer branding, applied as CSS variables)
            -> Business content  (academyContent.js today; API/DB later)
              -> Public website  (ClientSite.jsx)

  IMPORTANT: customer themes are independent of the Appzet Web Solution platform design
  tokens (styles/tokens.css). A restaurant can be orange, a gym red/black, a
  coaching centre blue, without touching the Appzet Web Solution brand.
*/

// Keys map 1:1 to the Tailwind @theme tokens used by the client-site components
// (see styles/clientSiteTailwind.css), so components need no changes to be re-themed.
export const defaultTheme = {
  primary: "#0b6e4f",
  primaryDark: "#084d38",
  accent: "#f4b400", // highlights / gold
  button: "#ff6b00", // primary call-to-action
  buttonHover: "#e05a00",
  dark: "#0f172a", // dark sections / headings
};

const themeToCssVars = (theme) => ({
  "--color-primary": theme.primary,
  "--color-primary-dark": theme.primaryDark,
  "--color-gold": theme.accent,
  "--color-cta": theme.button,
  "--color-cta-dark": theme.buttonHover,
  "--color-dark": theme.dark,
});

// Today every tenant renders the academy template with the default theme.
// Later this can resolve per slug (from the Client document) without changing components.
const siteConfigBySlug = {};

export const getSiteConfig = (slug) => {
  const config = siteConfigBySlug[slug] || {};

  return {
    template: config.template || "academy",
    theme: { ...defaultTheme, ...(config.theme || {}) },
    content: config.content || academy,
  };
};

export const getThemeStyle = (theme) => themeToCssVars({ ...defaultTheme, ...theme });
