import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const emptyLead = { name: "", phone: "", template: "", status: "New" };

const LeadsModule = () => {
  const [leads, setLeads] = useState([]);
  const [statuses, setStatuses] = useState(["New", "Contacted", "Qualified"]);
  const [draft, setDraft] = useState(emptyLead);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");

  const loadLeads = () =>
    apiRequest("/admin/business/leads").then((data) => {
      setLeads(data.leads || []);
      setStatuses(data.statuses || statuses);
    });

  useEffect(() => {
    loadLeads().catch((requestError) => setError(requestError.message));
  }, []);

  const updateDraft = (field, value) => {
    setDraft((currentDraft) => ({ ...currentDraft, [field]: value }));
  };

  const createLead = async (event) => {
    event.preventDefault();
    setSavingId("new");
    setError("");

    try {
      await apiRequest("/admin/business/leads", {
        method: "POST",
        body: JSON.stringify(draft),
      });
      setDraft(emptyLead);
      await loadLeads();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingId("");
    }
  };

  const convertLead = async (leadId) => {
    setSavingId(leadId);
    setError("");

    try {
      await apiRequest(`/admin/business/leads/${leadId}/convert`, { method: "PUT" });
      await loadLeads();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingId("");
    }
  };

  return (
    <div className="dashboard-panel">
      <div className="dashboard-heading">
        <p className="dashboard-kicker">Lead pipeline</p>
        <h1>Leads</h1>
        <p>Create, review, and convert customer enquiries into website orders.</p>
      </div>

      {error ? <p className="dashboard-error">{error}</p> : null}

      <form className="business-inline-form" onSubmit={createLead}>
        <input
          type="text"
          placeholder="Client name"
          value={draft.name}
          onChange={(event) => updateDraft("name", event.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={draft.phone}
          onChange={(event) => updateDraft("phone", event.target.value)}
        />
        <input
          type="text"
          placeholder="Template"
          value={draft.template}
          onChange={(event) => updateDraft("template", event.target.value)}
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
        <button type="submit" disabled={savingId === "new"}>
          {savingId === "new" ? "Saving..." : "Add lead"}
        </button>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Template</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td data-label="Name">{lead.name}</td>
                <td data-label="Phone">{lead.phone}</td>
                <td data-label="Template">{lead.template}</td>
                <td data-label="Status">
                  <span className="table-pill">{lead.status}</span>
                </td>
                <td data-label="Action">
                  <button
                    type="button"
                    disabled={lead.status === "Converted" || savingId === lead.id}
                    onClick={() => convertLead(lead.id)}
                  >
                    {savingId === lead.id ? "Converting..." : "Convert to order"}
                  </button>
                </td>
              </tr>
            ))}
            {!leads.length ? (
              <tr>
                <td colSpan="5">No leads yet.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsModule;
