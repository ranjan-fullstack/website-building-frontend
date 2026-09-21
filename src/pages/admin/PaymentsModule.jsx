import { useEffect, useState } from "react";
import EmptyState from "../../components/ui/EmptyState";
import { SkeletonTable } from "../../components/ui/Skeleton";
import StatusBadge from "../../components/ui/StatusBadge";
import { apiRequest } from "../../services/api";
import { PanelHeading } from "../dashboard/DashboardLayout";

const emptyPayment = { orderId: "", amount: "", status: "Pending", method: "UPI" };

const PaymentsModule = () => {
  const [payments, setPayments] = useState([]);
  const [statuses, setStatuses] = useState(["Pending", "Paid"]);
  const [methods, setMethods] = useState(["UPI", "Cash"]);
  const [draft, setDraft] = useState(emptyPayment);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPayments = () =>
    apiRequest("/admin/business/payments").then((data) => {
      setPayments(data.payments || []);
      setStatuses(data.statuses || statuses);
      setMethods(data.methods || methods);
    });

  useEffect(() => {
    loadPayments().catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
  }, []);

  const updateDraft = (field, value) => {
    setDraft((currentDraft) => ({ ...currentDraft, [field]: value }));
  };

  const createPayment = async (event) => {
    event.preventDefault();
    setSavingId("new");
    setError("");

    try {
      await apiRequest("/admin/business/payments", {
        method: "POST",
        body: JSON.stringify(draft),
      });
      setDraft(emptyPayment);
      await loadPayments();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingId("");
    }
  };

  const markPaid = async (paymentId) => {
    setSavingId(paymentId);
    setError("");

    try {
      await apiRequest(`/admin/business/payments/${paymentId}/paid`, { method: "PUT" });
      await loadPayments();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingId("");
    }
  };

  const pendingCount = payments.filter((payment) => payment.status === "Pending").length;

  return (
    <div className="wm-panel">
      <PanelHeading kicker="Billing" title="Payments" text={<>{pendingCount} pending payment{pendingCount === 1 ? "" : "s"} need follow-up.</>} />

      {error ? <p className="wm-alert wm-alert-error" role="alert">{error}</p> : null}

      <form className="business-inline-form" onSubmit={createPayment}>
        <div className="wm-field">
<label htmlFor="paym-f1">Order ID</label>
<input id="paym-f1" className="wm-input" type="text"
          placeholder="Order ID"
          value={draft.orderId}
          onChange={(event) => updateDraft("orderId", event.target.value)} />
</div>
        <div className="wm-field">
<label htmlFor="paym-f2">Amount</label>
<input id="paym-f2" className="wm-input" type="number"
          min="0"
          placeholder="Amount"
          value={draft.amount}
          onChange={(event) => updateDraft("amount", event.target.value)} />
</div>
        <div className="wm-field">
<label htmlFor="paym-f3">Status</label>
<select id="paym-f3" className="wm-select"
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
        <div className="wm-field">
<label htmlFor="paym-f4">Method</label>
<select id="paym-f4" className="wm-select"
          value={draft.method}
          onChange={(event) => updateDraft("method", event.target.value)}
        >
          {methods.map((method) => (
            <option value={method} key={method}>
              {method}
            </option>
          ))}
        </select>
</div>
        <button className="wm-btn wm-btn-primary" type="submit" disabled={savingId === "new"}>
          {savingId === "new" ? "Saving..." : "Add payment"}
        </button>
      </form>

      {loading ? <SkeletonTable rows={4} /> : null}
      <div className="admin-table-wrap" hidden={loading}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Method</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td data-label="Order ID">{payment.orderId}</td>
                <td data-label="Amount">Rs {payment.amount}</td>
                <td data-label="Status">
                  <StatusBadge status={payment.status} />
                </td>
                <td data-label="Method">{payment.method}</td>
                <td data-label="Action">
                  <button
 className="wm-btn wm-btn-secondary wm-btn-sm"
 type="button"
                    disabled={payment.status === "Paid" || savingId === payment.id}
                    onClick={() => markPaid(payment.id)}
                  >
                    {savingId === payment.id ? "Saving..." : "Mark paid"}
                  </button>
                </td>
              </tr>
            ))}
            {!payments.length ? (
              <tr>
                <td colSpan="5">
<EmptyState title="No payments yet" text="Record a payment using the form above." />
</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsModule;
