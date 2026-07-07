import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const emptyClient = { name: "", slug: "", subdomain: "", contactPhone: "" };
const emptyTenantLink = { userId: "", clientId: "" };

const AdminClientsModule = () => {
  const [clients, setClients] = useState([]);
  const [draft, setDraft] = useState(emptyClient);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");

  const [tenantLink, setTenantLink] = useState(emptyTenantLink);
  const [linkingTenant, setLinkingTenant] = useState(false);
  const [tenantMessage, setTenantMessage] = useState("");
  const [tenantError, setTenantError] = useState("");

  const loadClients = () =>
    apiRequest("/admin/clients").then((data) => {
      setClients(data.clients || []);
    });

  useEffect(() => {
    loadClients().catch((requestError) => setError(requestError.message));
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
    <div className="dashboard-panel">
      <div className="dashboard-heading">
        <p className="dashboard-kicker">Client sites</p>
        <h1>Clients</h1>
        <p>Create client sites, pause or unpause access, and link user accounts.</p>
      </div>

      {error ? <p className="dashboard-error">{error}</p> : null}

      <form className="business-inline-form" onSubmit={createClient}>
        <input
          type="text"
          placeholder="Client name"
          value={draft.name}
          onChange={(event) => updateDraft("name", event.target.value)}
        />
        <input
          type="text"
          placeholder="Slug (cricket-academy)"
          value={draft.slug}
          onChange={(event) => updateDraft("slug", event.target.value)}
        />
        <input
          type="text"
          placeholder="Subdomain (optional)"
          value={draft.subdomain}
          onChange={(event) => updateDraft("subdomain", event.target.value)}
        />
        <input
          type="tel"
          placeholder="Contact phone"
          value={draft.contactPhone}
          onChange={(event) => updateDraft("contactPhone", event.target.value)}
        />
        <button type="submit" disabled={savingId === "new"}>
          {savingId === "new" ? "Saving..." : "Add client"}
        </button>
      </form>

      <div className="admin-table-wrap">
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
                  <span className="table-pill">{client.status}</span>
                </td>
                <td data-label="Action">
                  <button
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
                <td colSpan="5">No clients yet.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="dashboard-heading" style={{ marginTop: "32px" }}>
        <p className="dashboard-kicker">Account linking</p>
        <h1>Link a user to a client</h1>
        <p>Assign a logged-in user's account to a client so they see that client's dashboard.</p>
      </div>

      {tenantMessage ? <p className="table-pill">{tenantMessage}</p> : null}
      {tenantError ? <p className="dashboard-error">{tenantError}</p> : null}

      <form className="business-inline-form" onSubmit={linkUserToTenant}>
        <input
          type="text"
          placeholder="User ID"
          value={tenantLink.userId}
          onChange={(event) =>
            setTenantLink((currentLink) => ({ ...currentLink, userId: event.target.value }))
          }
        />
        <select
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
        <button type="submit" disabled={linkingTenant || !tenantLink.userId || !tenantLink.clientId}>
          {linkingTenant ? "Linking..." : "Link user"}
        </button>
      </form>
    </div>
  );
};

export default AdminClientsModule;
