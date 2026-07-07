import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { apiRequest } from "../services/api";
import MySubmissionsModule from "./client/MySubmissionsModule";
import "../styles/Dashboard.css";

const getInitials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "CL";

const ClientDashboard = () => {
  const { logout, user } = useAuth();
  const [clientName, setClientName] = useState(user?.clientName || "");

  useEffect(() => {
    apiRequest("/auth/me")
      .then(({ user: freshUser }) => {
        setClientName(freshUser.clientName || "");
        window.localStorage.setItem("webmitra_google_user", JSON.stringify(freshUser));
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    logout();
    window.location.hash = "#/login";
  };

  return (
    <main className="client-dashboard-page">
      <header className="client-dashboard-header">
        <div className="client-dashboard-brand">
          <span className="client-dashboard-logo">{getInitials(clientName)}</span>
          <div>
            <strong>{clientName || "Your academy"}</strong>
            <span>Client dashboard</span>
          </div>
        </div>

        <button className="dashboard-logout" type="button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="client-dashboard-content">
        <MySubmissionsModule />
      </section>
    </main>
  );
};

export default ClientDashboard;
