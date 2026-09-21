import { PanelHeading } from "./DashboardLayout";
import { subscriptionPlans } from "./constants";

const SubscriptionPanel = () => (
  <div className="wm-panel">
    <PanelHeading
      kicker="Plan details"
      title="Manage subscription"
      text="Your current plan and upgrade path are shown here."
    />

    <div className="wm-stat-grid">
      {subscriptionPlans.map(([label, value]) => (
        <article className="wm-card wm-stat" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </article>
      ))}
    </div>

    <div className="wm-card wm-upgrade">
      <div>
        <h2>Need more pages or a custom domain?</h2>
        <p>Upgrade to Launch or Growth when your business is ready for a stronger public website.</p>
      </div>
      <a className="wm-btn wm-btn-primary" href="/#pricing">
        View pricing
      </a>
    </div>
  </div>
);

export default SubscriptionPanel;
