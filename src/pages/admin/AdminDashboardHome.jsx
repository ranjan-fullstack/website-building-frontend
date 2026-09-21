import { useCallback, useEffect, useState } from "react";
import ErrorState from "../../components/ui/ErrorState";
import { SkeletonDashboard } from "../../components/ui/Skeleton";
import { apiRequest } from "../../services/api";
import { PanelHeading } from "../dashboard/DashboardLayout";

// Only metrics the backend really provides (GET /admin/business/stats).
const statCards = [
  ["totalOrders", "Total orders", "blue", "Confirmed orders in the pipeline"],
  ["inProgress", "In progress", "purple", "Being designed or reviewed"],
  ["completed", "Completed", "green", "Website live or delivered"],
  ["pendingPayments", "Pending payments", "red", "Need follow-up"],
];

const AdminDashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(() => {
    apiRequest("/admin/business/stats")
      .then((data) => {
        setFailed(false);
        setStats(data.stats);
      })
      .catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const retry = () => {
    setFailed(false);
    load();
  };

  return (
    <div className="wm-panel">
      <PanelHeading
        kicker="Business overview"
        title="Admin dashboard"
        text="Track orders, delivery progress and payment follow-ups in one place."
      />

      {failed ? (
        <ErrorState title="Something went wrong" text="We could not load the business overview." onRetry={retry} />
      ) : null}
      {!stats && !failed ? <SkeletonDashboard /> : null}

      {stats ? (
        <div className="wm-stat-grid">
          {statCards.map(([key, label, tone, hint]) => (
            <article className={`wm-card wm-kpi wm-kpi-${tone}`} key={key}>
              <span>{label}</span>
              <strong>{stats[key]}</strong>
              <small>{hint}</small>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default AdminDashboardHome;
