import { useCallback, useEffect, useState } from "react";
import "../styles/ui.css";
import "../styles/Dashboard.css";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import { SkeletonTable } from "../components/ui/Skeleton";
import StatusBadge from "../components/ui/StatusBadge";
import { useAuth } from "../context/useAuth";
import { apiRequest } from "../services/api";
import { PanelHeading } from "./dashboard/DashboardLayout";
import { formatDateTime } from "./dashboard/constants";

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const getInitials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "CL";

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
  const [clientSlug, setClientSlug] = useState(user?.clientSlug || "");
  const [siteStatus, setSiteStatus] = useState("");
  const [activeType, setActiveType] = useState("inquiry");
  const [submissions, setSubmissions] = useState([]);
  const [loadState, setLoadState] = useState("loading"); // loading | ready | error
  const [actionError, setActionError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    apiRequest("/auth/me")
      .then(({ user: freshUser }) => {
        setClientName(freshUser.clientName || "");
        setClientSlug(freshUser.clientSlug || "");
        window.localStorage.setItem("webmitra_google_user", JSON.stringify(freshUser));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!clientSlug) {
      return;
    }

    apiRequest(`/public/${clientSlug}`)
      .then((data) => setSiteStatus(data.status || ""))
      .catch(() => setSiteStatus(""));
  }, [clientSlug]);

  const loadSubmissions = useCallback(() => {
    apiRequest("/client/submissions")
      .then((data) => {
        setSubmissions(data.submissions || []);
        setLoadState("ready");
      })
      .catch(() => setLoadState("error"));
  }, []);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  const retrySubmissions = () => {
    setLoadState("loading");
    loadSubmissions();
  };

  const handleLogout = () => {
    logout();
    window.location.hash = clientSlug ? `#/c/${clientSlug}` : "#/";
  };

  const updateStatus = async (submissionId, status) => {
    setUpdatingId(submissionId);
    setActionError("");

    try {
      const { submission } = await apiRequest(`/client/submissions/${submissionId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      setSubmissions((current) =>
        current.map((item) => (item.id === submission.id ? submission : item))
      );
    } catch (requestError) {
      setActionError(requestError.message);
    } finally {
      setUpdatingId("");
    }
  };

  const activeConfig = TAB_CONFIG[activeType];
  const visibleSubmissions = submissions.filter((submission) => submission.type === activeType);

  return (
    <div className="client-dashboard-page">
      <a className="wm-skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="client-dashboard-header">
        <div className="client-dashboard-brand">
          <span className="client-dashboard-logo" aria-hidden="true">
            {getInitials(clientName)}
          </span>
          <div>
            <strong>{clientName || "Your business"}</strong>
            <span>Client dashboard</span>
          </div>
        </div>

        <button className="wm-btn wm-btn-secondary wm-btn-sm" type="button" onClick={handleLogout}>
          Sign out
        </button>
      </header>

      <main id="main-content" className="client-dashboard-content">
        <div className="wm-panel">
          {clientSlug ? (
            <section className="wm-card client-website-card" aria-label="Your website">
              <div>
                <p className="wm-eyebrow">Your website</p>
                <h2>
                  {clientName}{" "}
                  {siteStatus ? (
                    <StatusBadge
                      status={siteStatus === "active" ? "Website live" : "Paused"}
                      tone={siteStatus === "active" ? "green" : "gray"}
                    />
                  ) : null}
                </h2>
                <p>Customers can send enquiries and admission requests from your website.</p>
              </div>
              <a className="wm-btn wm-btn-primary" href={`/c/${clientSlug}`} target="_blank" rel="noreferrer">
                Open Website
              </a>
            </section>
          ) : null}

          <PanelHeading
            kicker="Client submissions"
            title="My submissions"
            text="Enquiries and admission requests received through your website."
          />

          <div className="client-dashboard-tabs" role="group" aria-label="Submission type">
            {Object.entries(TAB_CONFIG).map(([type, config]) => (
              <button
                key={type}
                type="button"
                className={`wm-chip ${activeType === type ? "active" : ""}`}
                aria-pressed={activeType === type}
                onClick={() => setActiveType(type)}
              >
                {config.label} ({submissions.filter((item) => item.type === type).length})
              </button>
            ))}
          </div>

          {actionError ? (
            <p className="wm-alert wm-alert-error" role="alert">
              {actionError}
            </p>
          ) : null}

          {loadState === "loading" ? <SkeletonTable rows={4} label="Loading submissions" /> : null}
          {loadState === "error" ? (
            <ErrorState
              title="Something went wrong"
              text="We could not load your submissions."
              onRetry={retrySubmissions}
            />
          ) : null}

          {loadState === "ready" ? (
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
                          aria-label={`Status for ${submission.data?.name || submission.data?.studentName || "submission"}`}
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
                        <EmptyState
                          title={`No ${activeConfig.label.toLowerCase()} yet`}
                          text="New requests from your website will appear here."
                        />
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
