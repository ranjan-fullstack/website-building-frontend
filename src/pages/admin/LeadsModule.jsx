import { useEffect, useState } from "react";
import EmptyState from "../../components/ui/EmptyState";
import { SkeletonTable } from "../../components/ui/Skeleton";
import StatusBadge from "../../components/ui/StatusBadge";
import { apiRequest } from "../../services/api";
import { PanelHeading } from "../dashboard/DashboardLayout";

const emptyLead = { name: "", phone: "", template: "", status: "New" };

const LeadsModule = () => {
  const [leads, setLeads] = useState([]);
  const [statuses, setStatuses] = useState(["New", "Contacted", "Qualified"]);
  const [draft, setDraft] = useState(emptyLead);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadLeads = () =>
    apiRequest("/admin/business/leads").then((data) => {
      setLeads(data.leads || []);
      setStatuses(data.statuses || statuses);
    });

  useEffect(() => {
    loadLeads().catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
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
    <div className="wm-panel">
      <PanelHeading kicker="Lead pipeline" title="Leads" text="Create, review, and convert customer enquiries into website orders." />

      {error ? <p className="wm-alert wm-alert-error" role="alert">{error}</p> : null}

      <form className="business-inline-form" onSubmit={createLead}>
        <div className="wm-field">
<label htmlFor="lead-f1">Client name</label>
<input id="lead-f1" className="wm-input" type="text"
          placeholder="Client name"
          value={draft.name}
          onChange={(event) => updateDraft("name", event.target.value)} />
</div>
        <div className="wm-field">
<label htmlFor="lead-f2">Phone</label>
<input id="lead-f2" className="wm-input" type="tel"
          placeholder="Phone"
          value={draft.phone}
          onChange={(event) => updateDraft("phone", event.target.value)} />
</div>
        <div className="wm-field">
<label htmlFor="lead-f3">Template</label>
<input id="lead-f3" className="wm-input" type="text"
          placeholder="Template"
          value={draft.template}
          onChange={(event) => updateDraft("template", event.target.value)} />
</div>
        <div className="wm-field">
<label htmlFor="lead-f4">Status</label>
<select id="lead-f4" className="wm-select"
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
        <button className="wm-btn wm-btn-primary" type="submit" disabled={savingId === "new"}>
          {savingId === "new" ? "Saving..." : "Add lead"}
        </button>
      </form>

      {loading ? <SkeletonTable rows={4} /> : null}
      <div className="admin-table-wrap" hidden={loading}>
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
                  <StatusBadge status={lead.status} />
                </td>
                <td data-label="Action">
                  <button
 className="wm-btn wm-btn-secondary wm-btn-sm"
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
                <td colSpan="5">
<EmptyState title="No leads yet" text="Add your first lead using the form above." />
</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsModule;
