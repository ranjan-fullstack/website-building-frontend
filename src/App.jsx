import { MotionConfig } from "framer-motion";
import { Suspense, lazy, useEffect, useState } from "react";
import "./styles/ui.css";
import { SkeletonPage } from "./components/ui/Skeleton";
import { AuthProvider } from "./context/authProvider";
import Home from "./pages/Home";

// Everything except the home page is code-split so first load stays small.
const ClientSite = lazy(() => import("./pages/ClientSite"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const TemplateBuilder = lazy(() => import("./pages/TemplateBuilder"));
const TemplatePreview = lazy(() => import("./pages/TemplatePreview"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const TrustPage = lazy(() => import("./pages/TrustPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// In-page anchors on the home page (e.g. "#pricing") are not separate routes.
const homeAnchors = ["", "pricing", "how-it-works", "faq", "main-content"];
const privateRoutes = ["login", "dashboard", "admin", "track"];


const getRoute = () => window.location.hash || window.location.pathname || "#";

const routeMeta = {
  "": {
    title: "Appzet Web Solution - Build Your Business Website",
    description:
      "Appzet Web Solution builds affordable websites for Indian local businesses with WhatsApp enquiries, project tracking, and support.",
    path: "/",
  },
  about: {
    title: "About Appzet Web Solution - Affordable Websites for Local Businesses",
    description:
      "Learn about Appzet Web Solution, an affordable website service for Indian local businesses.",
    path: "/about",
  },
  contact: {
    title: "Contact Appzet Web Solution - Website Support and Enquiries",
    description:
      "Contact Appzet Web Solution for website setup, support, billing questions, and project help.",
    path: "/contact",
  },
  services: {
    title: "Appzet Web Solution Services - Website Setup, SEO Basics, and Support",
    description:
      "Explore Appzet Web Solution website setup, template customization, WhatsApp enquiry, SEO, and support services.",
    path: "/services",
  },
  login: {
    title: "Appzet Web Solution Login - Secure Account Access",
    description:
      "Sign in to Appzet Web Solution to manage your website projects and track progress.",
    path: "/login",
  },
  "privacy-policy": {
    title: "Privacy Policy - Appzet Web Solution",
    description:
      "Read how Appzet Web Solution handles account, enquiry, and project information.",
    path: "/privacy-policy",
  },
  "terms-and-conditions": {
    title: "Terms and Conditions - Appzet Web Solution",
    description:
      "Read the terms for using Appzet Web Solution website services, templates, and account features.",
    path: "/terms-and-conditions",
  },
  templates: {
    title: "Website Templates - Appzet Web Solution",
    description:
      "Browse Appzet Web Solution website templates for Indian local shops, clinics, gyms, coaching centres, and services.",
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
          title: `Appzet Web Solution ${templateSlug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")} Template`,
          description:
            "Preview this Appzet Web Solution website template for Indian local businesses.",
          path: `/templates/${templateSlug}`,
        }
      : routeMeta[canonicalRoute] || routeMeta[""];
  const canonicalUrl = `https://webmitra.online${meta.path}`;
  const robotsTag = document.querySelector('meta[name="robots"]');
  const descriptionTag = document.querySelector('meta[name="description"]');
  const canonicalTag = document.querySelector('link[rel="canonical"]');
  const ogUrlTag = document.querySelector('meta[property="og:url"]');
  const ogTitleTag = document.querySelector('meta[property="og:title"]');
  const ogDescriptionTag = document.querySelector('meta[property="og:description"]');

  robotsTag?.setAttribute(
    "content",
    privateRoutes.includes(route) ? "noindex, nofollow" : "index, follow"
  );
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
  const [pathOnlyHash] = cleanedHash.split("?");
  const parts = pathOnlyHash.split("/");
  const route = parts[0] || "";

  useEffect(() => {
    updateMeta(route, parts);
  }, [route, hash]);

  

  const renderPage = () => {
    if (parts[0] === "login") {
      return <Login hash={hash} />;
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

    if (parts[0] === "c" && parts[1]) {
      return <ClientSite hash={hash} />;
    }

    if (parts[0] === "templates" && parts[1]) {
      return <TemplatePreview hash={hash} />;
    }

    if (parts[0] === "templates") {
      return <TemplateBuilder hash={hash} />;
    }

    const isUnknownPath =
      !window.location.hash && window.location.pathname !== "/" && !homeAnchors.includes(route);

    if (isUnknownPath) {
      return <NotFound />;
    }

    return <Home />;
  };

  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <Suspense
          fallback={
            <div className="wm-container" style={{ paddingBlock: 48 }}>
              <SkeletonPage />
            </div>
          }
        >
          {renderPage()}
        </Suspense>
      </AuthProvider>
    </MotionConfig>
  );
}

export default App;
