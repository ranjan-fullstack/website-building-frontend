import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { apiRequest } from "../services/api";
import "../styles/Dashboard.css";

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const getInitials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "CL";

const formatDateTime = (value) => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const TAB_CONFIG = {
  inquiry: {
    label: "Enquiries",
    statusOptions: ["new", "contacted", "closed"],
    columns: [
      { label: "Name", render: (submission) => submission.data?.name || "-" },
      { label: "Phone", render: (submission) => submission.data?.phone || "-" },
      { label: "Message", render: (submission) => submission.data?.message || "-" },
    ],
  },
  admission: {
    label: "Admissions",
    statusOptions: ["new", "confirmed", "joined"],
    columns: [
      { label: "Student Name", render: (submission) => submission.data?.studentName || "-" },
      { label: "Phone", render: (submission) => submission.data?.phone || "-" },
      { label: "Age", render: (submission) => submission.data?.age || "-" },
      {
        label: "Batch Preference",
        render: (submission) => submission.data?.batchPreference || "-",
      },
    ],
  },
};

const ClientDashboard = () => {
  const { logout, user } = useAuth();
  const [clientName, setClientName] = useState(user?.clientName || "");
  const [activeType, setActiveType] = useState("inquiry");
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    apiRequest("/auth/me")
      .then(({ user: freshUser }) => {
        setClientName(freshUser.clientName || "");
        window.localStorage.setItem("webmitra_google_user", JSON.stringify(freshUser));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    apiRequest("/client/submissions")
      .then((data) => {
        setError("");
        setSubmissions(data.submissions || []);
      })
      .catch((requestError) => setError(requestError.message));
  }, []);

  const handleLogout = () => {
    logout();
    window.location.hash = "#/login";
  };

  const updateStatus = async (submissionId, status) => {
    setUpdatingId(submissionId);
    setError("");

    try {
      const { submission } = await apiRequest(`/client/submissions/${submissionId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      setSubmissions((current) =>
        current.map((item) => (item.id === submission.id ? submission : item))
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdatingId("");
    }
  };

  const activeConfig = TAB_CONFIG[activeType];
  const visibleSubmissions = submissions.filter((submission) => submission.type === activeType);

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
        <div className="dashboard-panel">
          <div className="dashboard-heading">
            <p className="dashboard-kicker">Client submissions</p>
            <h1>My submissions</h1>
            <p>Enquiries and admission requests received through your site.</p>
          </div>

          <div className="client-dashboard-tabs">
            {Object.entries(TAB_CONFIG).map(([type, config]) => (
              <button
                key={type}
                type="button"
                className={activeType === type ? "active" : ""}
                onClick={() => setActiveType(type)}
              >
                {config.label} ({submissions.filter((item) => item.type === type).length})
              </button>
            ))}
          </div>

          {error ? <p className="dashboard-error">{error}</p> : null}

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  {activeConfig.columns.map((column) => (
                    <th key={column.label}>{column.label}</th>
                  ))}
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {visibleSubmissions.map((submission) => (
                  <tr key={submission.id}>
                    {activeConfig.columns.map((column) => (
                      <td data-label={column.label} key={column.label}>
                        {column.render(submission)}
                      </td>
                    ))}
                    <td data-label="Status">
                      <select
                        className="status-select"
                        value={submission.status}
                        disabled={updatingId === submission.id}
                        onChange={(event) => updateStatus(submission.id, event.target.value)}
                      >
                        {activeConfig.statusOptions.map((status) => (
                          <option value={status} key={status}>
                            {capitalize(status)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td data-label="Date">{formatDateTime(submission.createdAt)}</td>
                  </tr>
                ))}
                {!visibleSubmissions.length ? (
                  <tr>
                    <td colSpan={activeConfig.columns.length + 2}>
                      No {activeConfig.label.toLowerCase()} yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ClientDashboard;
