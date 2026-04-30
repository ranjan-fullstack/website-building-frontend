import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const emptyPayment = { orderId: "", amount: "", status: "Pending", method: "UPI" };

const PaymentsModule = () => {
  const [payments, setPayments] = useState([]);
  const [statuses, setStatuses] = useState(["Pending", "Paid"]);
  const [methods, setMethods] = useState(["UPI", "Cash"]);
  const [draft, setDraft] = useState(emptyPayment);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");

  const loadPayments = () =>
    apiRequest("/admin/business/payments").then((data) => {
      setPayments(data.payments || []);
      setStatuses(data.statuses || statuses);
      setMethods(data.methods || methods);
    });

  useEffect(() => {
    loadPayments().catch((requestError) => setError(requestError.message));
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
    <div className="dashboard-panel">
      <div className="dashboard-heading">
        <p className="dashboard-kicker">Billing</p>
        <h1>Payments</h1>
        <p>{pendingCount} pending payment{pendingCount === 1 ? "" : "s"} need follow-up.</p>
      </div>

      {error ? <p className="dashboard-error">{error}</p> : null}

      <form className="business-inline-form" onSubmit={createPayment}>
        <input
          type="text"
          placeholder="Order ID"
          value={draft.orderId}
          onChange={(event) => updateDraft("orderId", event.target.value)}
        />
        <input
          type="number"
          min="0"
          placeholder="Amount"
          value={draft.amount}
          onChange={(event) => updateDraft("amount", event.target.value)}
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
        <select
          value={draft.method}
          onChange={(event) => updateDraft("method", event.target.value)}
        >
          {methods.map((method) => (
            <option value={method} key={method}>
              {method}
            </option>
          ))}
        </select>
        <button type="submit" disabled={savingId === "new"}>
          {savingId === "new" ? "Saving..." : "Add payment"}
        </button>
      </form>

      <div className="admin-table-wrap">
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
                  <span className="table-pill">{payment.status}</span>
                </td>
                <td data-label="Method">{payment.method}</td>
                <td data-label="Action">
                  <button
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
                <td colSpan="5">No payments yet.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsModule;
