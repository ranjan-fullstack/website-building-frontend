import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const emptyWebsite = {
  orderId: "",
  clientName: "",
  websiteUrl: "",
  status: "Delivered",
};

const WebsitesModule = () => {
  const [websites, setWebsites] = useState([]);
  const [statuses, setStatuses] = useState(["Delivered", "Live"]);
  const [draft, setDraft] = useState(emptyWebsite);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadWebsites = () =>
    apiRequest("/admin/business/websites").then((data) => {
      setWebsites(data.websites || []);
      setStatuses(data.statuses || statuses);
    });

  useEffect(() => {
    loadWebsites().catch((requestError) => setError(requestError.message));
  }, []);

  const updateDraft = (field, value) => {
    setDraft((currentDraft) => ({ ...currentDraft, [field]: value }));
  };

  const createWebsite = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await apiRequest("/admin/business/websites", {
        method: "POST",
        body: JSON.stringify(draft),
      });
      setDraft(emptyWebsite);
      await loadWebsites();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-panel">
      <div className="dashboard-heading">
        <p className="dashboard-kicker">Delivered work</p>
        <h1>Websites</h1>
        <p>Keep a clean list of delivered client websites and live URLs.</p>
      </div>

      {error ? <p className="dashboard-error">{error}</p> : null}

      <form className="business-inline-form" onSubmit={createWebsite}>
        <input
          type="text"
          placeholder="Order ID"
          value={draft.orderId}
          onChange={(event) => updateDraft("orderId", event.target.value)}
        />
        <input
          type="text"
          placeholder="Client name"
          value={draft.clientName}
          onChange={(event) => updateDraft("clientName", event.target.value)}
        />
        <input
          type="url"
          placeholder="https://client-site.com"
          value={draft.websiteUrl}
          onChange={(event) => updateDraft("websiteUrl", event.target.value)}
        />
        <select
          value={draft.status}
          onChange={(event) => updateDraft("status", event.target.value)}
        >
          {statuses.map((status) => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </select>
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add website"}
        </button>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client name</th>
              <th>Website URL</th>
              <th>Status</th>
              <th>Order ID</th>
            </tr>
          </thead>
          <tbody>
            {websites.map((website) => (
              <tr key={website.id}>
                <td data-label="Client name">{website.clientName}</td>
                <td data-label="Website URL">
                  <a href={website.websiteUrl} target="_blank" rel="noreferrer">
                    {website.websiteUrl}
                  </a>
                </td>
                <td data-label="Status">
                  <span className="table-pill">{website.status}</span>
                </td>
                <td data-label="Order ID">{website.orderId}</td>
              </tr>
            ))}
            {!websites.length ? (
              <tr>
                <td colSpan="4">No delivered websites yet.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WebsitesModule;
