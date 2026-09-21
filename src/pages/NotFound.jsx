import "../styles/ui.css";
import "../styles/Marketing.css";
import EmptyState from "../components/ui/EmptyState";
import SiteFooter from "../components/ui/SiteFooter";
import SiteHeader from "../components/ui/SiteHeader";

const NotFound = () => (
  <div className="wm-page">
    <SiteHeader />
    <main id="main-content" className="wm-container wm-section">
      <EmptyState
        icon="?"
        title="Page not found"
        text="The page you are looking for does not exist or has moved."
        actionLabel="Back to home"
        actionHref="/"
      />
    </main>
    <SiteFooter />
  </div>
);

export default NotFound;
