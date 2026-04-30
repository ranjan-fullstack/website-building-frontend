import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const statCards = [
  ["totalOrders", "Total orders"],
  ["inProgress", "In progress"],
  ["completed", "Completed"],
  ["pendingPayments", "Pending payments"],
];

const AdminDashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/admin/business/stats")
      .then((data) => {
        setError("");
        setStats(data.stats);
      })
      .catch((requestError) => setError(requestError.message));
  }, []);

  return (
    <div className="dashboard-panel">
      <div className="dashboard-heading">
        <p className="dashboard-kicker">Business overview</p>
        <h1>Admin dashboard</h1>
        <p>Track orders, delivery progress, and payment follow-ups in one place.</p>
      </div>

      {error ? <p className="dashboard-error">{error}</p> : null}

      <div className="admin-metrics">
        {statCards.map(([key, label]) => (
          <article key={key}>
            <strong>{stats ? stats[key] : "-"}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
