import { useEffect, useState } from "react";
import "./App.css";
import { AuthProvider } from "./context/authProvider";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TemplateBuilder from "./pages/TemplateBuilder";
import TemplatePreview from "./pages/TemplatePreview";
import TrackOrder from "./pages/TrackOrder";
import TrustPage from "./pages/TrustPage";


const getRoute = () => window.location.hash || window.location.pathname || "#";

const routeMeta = {
  "": {
    title: "WebMitra - Build Your Business Website",
    description:
      "WebMitra builds affordable websites for Indian local businesses with Google Sign-In, WhatsApp enquiries, project tracking, and support.",
    path: "/",
  },
  about: {
    title: "About WebMitra - Affordable Websites for Local Businesses",
    description:
      "Learn about WebMitra, an affordable website service for Indian local businesses.",
    path: "/about",
  },
  contact: {
    title: "Contact WebMitra - Website Support and Enquiries",
    description:
      "Contact WebMitra for website setup, support, billing questions, and project help.",
    path: "/contact",
  },
  services: {
    title: "WebMitra Services - Website Setup, SEO Basics, and Support",
    description:
      "Explore WebMitra website setup, template customization, WhatsApp enquiry, SEO, and support services.",
    path: "/services",
  },
  login: {
    title: "WebMitra Login - Secure Google Sign-In",
    description:
      "Sign in to WebMitra with the official Google Sign-In flow to manage website projects.",
    path: "/login",
  },
  "privacy-policy": {
    title: "Privacy Policy - WebMitra",
    description:
      "Read how WebMitra handles account, enquiry, and project information.",
    path: "/privacy-policy",
  },
  "terms-and-conditions": {
    title: "Terms and Conditions - WebMitra",
    description:
      "Read the terms for using WebMitra website services, templates, and account features.",
    path: "/terms-and-conditions",
  },
  templates: {
    title: "Website Templates - WebMitra",
    description:
      "Browse WebMitra website templates for Indian local shops, clinics, gyms, coaching centres, and services.",
    path: "/templates",
  },
};

const canonicalPathByRoute = {
  privacy: "privacy-policy",
  terms: "terms-and-conditions",
};

const updateMeta = (route, parts) => {
  const canonicalRoute = canonicalPathByRoute[route] || route || "";
  const templateSlug = route === "templates" ? parts[1] : "";
  const meta =
    templateSlug
      ? {
          title: `WebMitra ${templateSlug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")} Template`,
          description:
            "Preview this WebMitra website template for Indian local businesses.",
          path: `/templates/${templateSlug}`,
        }
      : routeMeta[canonicalRoute] || routeMeta[""];
  const canonicalUrl = `https://webmitra.online${meta.path}`;
  const descriptionTag = document.querySelector('meta[name="description"]');
  const canonicalTag = document.querySelector('link[rel="canonical"]');
  const ogUrlTag = document.querySelector('meta[property="og:url"]');
  const ogTitleTag = document.querySelector('meta[property="og:title"]');
  const ogDescriptionTag = document.querySelector('meta[property="og:description"]');

  document.title = meta.title;
  descriptionTag?.setAttribute("content", meta.description);
  canonicalTag?.setAttribute("href", canonicalUrl);
  ogUrlTag?.setAttribute("content", canonicalUrl);
  ogTitleTag?.setAttribute("content", meta.title);
  ogDescriptionTag?.setAttribute("content", meta.description);
};

function App() {
  const [hash, setHash] = useState(getRoute);

  useEffect(() => {
    const handleRouteChange = () => setHash(getRoute());
    window.addEventListener("hashchange", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const cleanedHash = hash.replace(/^#?\/?/, "");
  const parts = cleanedHash.split("/");
  const route = parts[0] || "";

  useEffect(() => {
    updateMeta(route, parts);
  }, [route, hash]);

  

  const renderPage = () => {
    if (parts[0] === "login") {
      return <Login />;
    }

    if (["about", "contact", "services", "privacy", "privacy-policy", "terms", "terms-and-conditions"].includes(parts[0])) {
      const trustPageType = {
        "privacy-policy": "privacy",
        "terms-and-conditions": "terms",
      }[parts[0]] || parts[0];

      return <TrustPage type={trustPageType} />;
    }

    if (parts[0] === "dashboard" || parts[0] === "admin") {
      return <Dashboard hash={hash} />;
    }

    if (parts[0] === "track" && parts[1]) {
      return <TrackOrder hash={hash} />;
    }

    if (parts[0] === "templates" && parts[1]) {
      return <TemplatePreview hash={hash} />;
    }

    if (parts[0] === "templates") {
      return <TemplateBuilder hash={hash} />;
    }

    return <Home />;
  };

  return <AuthProvider>{renderPage()}</AuthProvider>;
}

export default App;
