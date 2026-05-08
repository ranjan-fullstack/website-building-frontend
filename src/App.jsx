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

  

  const renderPage = () => {
    if (parts[0] === "login") {
      return <Login />;
    }

    if (["about", "contact", "privacy"].includes(parts[0])) {
      return <TrustPage type={parts[0]} />;
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
