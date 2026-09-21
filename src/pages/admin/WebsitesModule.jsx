import { useEffect, useState } from "react";
import EmptyState from "../../components/ui/EmptyState";
import { SkeletonTable } from "../../components/ui/Skeleton";
import StatusBadge from "../../components/ui/StatusBadge";
import { apiRequest } from "../../services/api";
import { PanelHeading } from "../dashboard/DashboardLayout";

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
  const [loading, setLoading] = useState(true);

  const loadWebsites = () =>
    apiRequest("/admin/business/websites").then((data) => {
      setWebsites(data.websites || []);
      setStatuses(data.statuses || statuses);
    });

  useEffect(() => {
    loadWebsites().catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
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
    <div className="wm-panel">
      <PanelHeading kicker="Delivered work" title="Websites" text="Keep a clean list of delivered client websites and live URLs." />

      {error ? <p className="wm-alert wm-alert-error" role="alert">{error}</p> : null}

      <form className="business-inline-form" onSubmit={createWebsite}>
        <div className="wm-field">
<label htmlFor="webs-f1">Order ID</label>
<input id="webs-f1" className="wm-input" type="text"
          placeholder="Order ID"
          value={draft.orderId}
          onChange={(event) => updateDraft("orderId", event.target.value)} />
</div>
        <div className="wm-field">
<label htmlFor="webs-f2">Client name</label>
<input id="webs-f2" className="wm-input" type="text"
          placeholder="Client name"
          value={draft.clientName}
          onChange={(event) => updateDraft("clientName", event.target.value)} />
</div>
        <div className="wm-field">
<label htmlFor="webs-f3">Website URL</label>
<input id="webs-f3" className="wm-input" type="url"
          placeholder="https://client-site.com"
          value={draft.websiteUrl}
          onChange={(event) => updateDraft("websiteUrl", event.target.value)} />
</div>
        <div className="wm-field">
<label htmlFor="webs-f4">Status</label>
<select id="webs-f4" className="wm-select"
          value={draft.status}
          onChange={(event) => updateDraft("status", event.target.value)}
        >
          {statuses.map((status) => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </select>
</div>
        <button className="wm-btn wm-btn-primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add website"}
        </button>
      </form>

      {loading ? <SkeletonTable rows={4} /> : null}
      <div className="admin-table-wrap" hidden={loading}>
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
                  <StatusBadge status={website.status} />
                </td>
                <td data-label="Order ID">{website.orderId}</td>
              </tr>
            ))}
            {!websites.length ? (
              <tr>
                <td colSpan="4">
<EmptyState title="No delivered websites yet" text="Add a delivered website using the form above." />
</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WebsitesModule;
