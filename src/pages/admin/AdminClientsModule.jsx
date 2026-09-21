import { useEffect, useState } from "react";
import EmptyState from "../../components/ui/EmptyState";
import { SkeletonTable } from "../../components/ui/Skeleton";
import StatusBadge from "../../components/ui/StatusBadge";
import { apiRequest } from "../../services/api";
import { PanelHeading } from "../dashboard/DashboardLayout";

const emptyClient = { name: "", slug: "", subdomain: "", contactPhone: "" };
const emptyTenantLink = { userId: "", clientId: "" };

const AdminClientsModule = () => {
  const [clients, setClients] = useState([]);
  const [draft, setDraft] = useState(emptyClient);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [tenantLink, setTenantLink] = useState(emptyTenantLink);
  const [linkingTenant, setLinkingTenant] = useState(false);
  const [tenantMessage, setTenantMessage] = useState("");
  const [tenantError, setTenantError] = useState("");

  const loadClients = () =>
    apiRequest("/admin/clients").then((data) => {
      setClients(data.clients || []);
    });

  useEffect(() => {
    loadClients().catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
  }, []);

  const updateDraft = (field, value) => {
    setDraft((currentDraft) => ({ ...currentDraft, [field]: value }));
  };

  const createClient = async (event) => {
    event.preventDefault();
    setSavingId("new");
    setError("");

    try {
      await apiRequest("/admin/clients", {
        method: "POST",
        body: JSON.stringify(draft),
      });
      setDraft(emptyClient);
      await loadClients();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingId("");
    }
  };

  const toggleClientStatus = async (client) => {
    setSavingId(client.id);
    setError("");

    try {
      const nextStatus = client.status === "active" ? "paused" : "active";
      await apiRequest(`/admin/clients/${client.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
      await loadClients();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingId("");
    }
  };

  const linkUserToTenant = async (event) => {
    event.preventDefault();
    setLinkingTenant(true);
    setTenantError("");
    setTenantMessage("");

    try {
      await apiRequest(`/admin/users/${tenantLink.userId}/tenant`, {
        method: "PATCH",
        body: JSON.stringify({ tenantId: tenantLink.clientId }),
      });
      setTenantMessage("User linked to client successfully.");
      setTenantLink((currentLink) => ({ ...currentLink, userId: "" }));
    } catch (requestError) {
      setTenantError(requestError.message);
    } finally {
      setLinkingTenant(false);
    }
  };

  return (
    <div className="wm-panel">
      <PanelHeading kicker="Client sites" title="Clients" text="Create client sites, pause or unpause access, and link user accounts." />

      {error ? <p className="wm-alert wm-alert-error" role="alert">{error}</p> : null}

      <form className="business-inline-form" onSubmit={createClient}>
        <div className="wm-field">
<label htmlFor="admi-f1">Client name</label>
<input id="admi-f1" className="wm-input" type="text"
          placeholder="Client name"
          value={draft.name}
          onChange={(event) => updateDraft("name", event.target.value)} />
</div>
        <div className="wm-field">
<label htmlFor="admi-f2">Slug</label>
<input id="admi-f2" className="wm-input" type="text"
          placeholder="Slug (cricket-academy)"
          value={draft.slug}
          onChange={(event) => updateDraft("slug", event.target.value)} />
</div>
        <div className="wm-field">
<label htmlFor="admi-f3">Subdomain</label>
<input id="admi-f3" className="wm-input" type="text"
          placeholder="Subdomain (optional)"
          value={draft.subdomain}
          onChange={(event) => updateDraft("subdomain", event.target.value)} />
</div>
        <div className="wm-field">
<label htmlFor="admi-f4">Contact phone</label>
<input id="admi-f4" className="wm-input" type="tel"
          placeholder="Contact phone"
          value={draft.contactPhone}
          onChange={(event) => updateDraft("contactPhone", event.target.value)} />
</div>
        <button className="wm-btn wm-btn-primary" type="submit" disabled={savingId === "new"}>
          {savingId === "new" ? "Saving..." : "Add client"}
        </button>
      </form>

      {loading ? <SkeletonTable rows={4} /> : null}
      <div className="admin-table-wrap" hidden={loading}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Subdomain</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td data-label="Name">{client.name}</td>
                <td data-label="Slug">{client.slug}</td>
                <td data-label="Subdomain">{client.subdomain || "-"}</td>
                <td data-label="Status">
                  <StatusBadge status={client.status} />
                </td>
                <td data-label="Action">
                  <button
 className="wm-btn wm-btn-secondary wm-btn-sm"
 type="button"
                    disabled={savingId === client.id}
                    onClick={() => toggleClientStatus(client)}
                  >
                    {savingId === client.id
                      ? "Saving..."
                      : client.status === "active"
                        ? "Pause"
                        : "Unpause"}
                  </button>
                </td>
              </tr>
            ))}
            {!clients.length ? (
              <tr>
                <td colSpan="5">
<EmptyState title="No clients yet" text="Create your first client site using the form above." />
</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <PanelHeading kicker="Account linking" title="Link a user to a client" text="Assign a logged-in user's account to a client so they see that client's dashboard." />

      {tenantMessage ? <p className="wm-alert wm-alert-success" role="status">{tenantMessage}</p> : null}
      {tenantError ? <p className="wm-alert wm-alert-error" role="alert">{tenantError}</p> : null}

      <form className="business-inline-form" onSubmit={linkUserToTenant}>
        <div className="wm-field">
<label htmlFor="admi-f5">User ID</label>
<input id="admi-f5" className="wm-input" type="text"
          placeholder="User ID"
          value={tenantLink.userId}
          onChange={(event) =>
            setTenantLink((currentLink) => ({ ...currentLink, userId: event.target.value }))
          } />
</div>
        <div className="wm-field">
<label htmlFor="admi-f6">Client</label>
<select id="admi-f6" className="wm-select"
          value={tenantLink.clientId}
          onChange={(event) =>
            setTenantLink((currentLink) => ({ ...currentLink, clientId: event.target.value }))
          }
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option value={client.id} key={client.id}>
              {client.name}
            </option>
          ))}
        </select>
</div>
        <button className="wm-btn wm-btn-primary" type="submit" disabled={linkingTenant || !tenantLink.userId || !tenantLink.clientId}>
          {linkingTenant ? "Linking..." : "Link user"}
        </button>
      </form>
    </div>
  );
};

export default AdminClientsModule;
