import { useMemo, useState } from "react";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import { SkeletonTable } from "../../components/ui/Skeleton";
import StatusBadge from "../../components/ui/StatusBadge";
import { PanelHeading } from "./DashboardLayout";

const PAGE_SIZE = 10;

const stateLabel = (order) =>
  order.orderState === "lead" ? "Lead" : order.orderState === "rejected" ? "Rejected" : order.status;

const AdminOrdersPanel = ({
  orders,
  orderStatuses,
  orderDrafts,
  timelineDrafts,
  loadState,
  actionError,
  savingOrderId,
  copyLabelByOrder,
  onUpdateOrderDraft,
  onUpdateTimelineDraft,
  onSaveStatus,
  onDecideLead,
  onAddTimeline,
  onCopyLink,
  onRetry,
}) => {
  const [openId, setOpenId] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [rejectTarget, setRejectTarget] = useState(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return orders.filter((order) => {
      const label = stateLabel(order);
      const matchesStatus = statusFilter === "all" || label === statusFilter;
      const matchesSearch =
        !term || `${order.id} ${order.name} ${order.template} ${order.phone}`.toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const filterOptions = ["Lead", "Rejected", ...orderStatuses];

  const confirmReject = async () => {
    const target = rejectTarget;
    await onDecideLead(target, "reject");
    setRejectTarget(null);
  };

  return (
    <div className="wm-panel">
      <PanelHeading
        kicker="Order control"
        title="Website orders"
        text="Manage leads, update the delivery pipeline, add timeline notes and publish final website links."
      />

      {actionError ? (
        <p className="wm-alert wm-alert-error" role="alert">
          {actionError}
        </p>
      ) : null}

      {loadState === "loading" ? <SkeletonTable rows={6} label="Loading orders" /> : null}
      {loadState === "error" ? (
        <ErrorState title="Something went wrong" text="We could not load orders." onRetry={onRetry} />
      ) : null}

      {loadState === "ready" && !orders.length ? (
        <EmptyState
          icon="▤"
          title="No orders yet"
          text="Leads and orders will appear here when customers choose a template and contact Appzet Web Solution."
        />
      ) : null}

      {loadState === "ready" && orders.length ? (
        <>
          <div className="wm-toolbar">
            <div className="wm-field">
              <label htmlFor="order-search">Search orders</label>
              <input
                id="order-search"
                className="wm-input"
                type="search"
                placeholder="Order ID, name, template or phone"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="wm-field">
              <label htmlFor="order-filter">Status</label>
              <select
                id="order-filter"
                className="wm-select"
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(1);
                }}
              >
                <option value="all">All statuses</option>
                {filterOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!visible.length ? (
            <EmptyState
              title="No orders match your filters"
              text="Try a different search or status."
              actionLabel="Clear filters"
              onAction={() => {
                setSearch("");
                setStatusFilter("all");
              }}
            />
          ) : (
            <div className="order-admin-list">
              {visible.map((order) => {
                const isOpen = openId === order.id;
                const saving = savingOrderId === order.id;

                return (
                  <article className="order-admin-card" key={order.id}>
                    <button
                      className={`order-admin-top ${isOpen ? "open" : ""}`}
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenId(isOpen ? "" : order.id)}
                    >
                      <div>
                        <span>{order.id}</span>
                        <strong>{order.name}</strong>
                        <p>
                          {order.template} | {order.phone}
                        </p>
                      </div>
                      <StatusBadge status={stateLabel(order)} />
                    </button>

                    {isOpen ? (
                      <>
                        {order.orderState === "lead" ? (
                          <div className="order-admin-footer lead-decision-row">
                            <button
                              className="wm-btn wm-btn-primary wm-btn-sm"
                              type="button"
                              disabled={saving}
                              onClick={() => onDecideLead(order.id, "create")}
                            >
                              {saving ? "Saving..." : "Create order"}
                            </button>
                            <button
                              className="wm-btn wm-btn-danger wm-btn-sm"
                              type="button"
                              disabled={saving}
                              onClick={() => setRejectTarget(order.id)}
                            >
                              Reject
                            </button>
                          </div>
                        ) : null}

                        {order.orderState === "order" ? (
                          <>
                            <div className="order-admin-actions">
                              <div className="wm-field">
                                <label htmlFor={`status-${order.id}`}>Status</label>
                                <select
                                  id={`status-${order.id}`}
                                  className="wm-select"
                                  value={orderDrafts[order.id]?.status || order.status}
                                  disabled={saving}
                                  onChange={(event) => onUpdateOrderDraft(order.id, "status", event.target.value)}
                                >
                                  {orderStatuses.map((status) => (
                                    <option value={status} key={status}>
                                      {status}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="wm-field">
                                <label htmlFor={`url-${order.id}`}>Website URL</label>
                                <input
                                  id={`url-${order.id}`}
                                  className="wm-input"
                                  type="url"
                                  placeholder="https://client-site.com"
                                  value={orderDrafts[order.id]?.websiteUrl || ""}
                                  disabled={saving}
                                  onChange={(event) => onUpdateOrderDraft(order.id, "websiteUrl", event.target.value)}
                                />
                              </div>
                              <div className="wm-field order-admin-wide">
                                <label htmlFor={`note-${order.id}`}>Status note (visible to customer)</label>
                                <textarea
                                  id={`note-${order.id}`}
                                  className="wm-textarea"
                                  rows="2"
                                  placeholder="Short update for this status change"
                                  value={orderDrafts[order.id]?.note || ""}
                                  disabled={saving}
                                  onChange={(event) => onUpdateOrderDraft(order.id, "note", event.target.value)}
                                />
                              </div>
                              <button
                                className="wm-btn wm-btn-primary"
                                type="button"
                                disabled={saving}
                                onClick={() => onSaveStatus(order.id)}
                              >
                                {saving ? "Saving..." : "Update status"}
                              </button>
                            </div>

                            <div className="order-admin-actions timeline-admin-actions">
                              <div className="wm-field">
                                <label htmlFor={`ttitle-${order.id}`}>Timeline title</label>
                                <input
                                  id={`ttitle-${order.id}`}
                                  className="wm-input"
                                  type="text"
                                  placeholder="Homepage draft shared"
                                  value={timelineDrafts[order.id]?.title || ""}
                                  disabled={saving}
                                  onChange={(event) => onUpdateTimelineDraft(order.id, "title", event.target.value)}
                                />
                              </div>
                              <div className="wm-field">
                                <label htmlFor={`tstatus-${order.id}`}>Timeline status</label>
                                <select
                                  id={`tstatus-${order.id}`}
                                  className="wm-select"
                                  value={timelineDrafts[order.id]?.status || order.status}
                                  disabled={saving}
                                  onChange={(event) => onUpdateTimelineDraft(order.id, "status", event.target.value)}
                                >
                                  {orderStatuses.map((status) => (
                                    <option value={status} key={status}>
                                      {status}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="wm-field order-admin-wide">
                                <label htmlFor={`tnote-${order.id}`}>Timeline note (visible to customer)</label>
                                <textarea
                                  id={`tnote-${order.id}`}
                                  className="wm-textarea"
                                  rows="2"
                                  placeholder="Add a visible project update"
                                  value={timelineDrafts[order.id]?.note || ""}
                                  disabled={saving}
                                  onChange={(event) => onUpdateTimelineDraft(order.id, "note", event.target.value)}
                                />
                              </div>
                              <button
                                className="wm-btn wm-btn-secondary"
                                type="button"
                                disabled={saving}
                                onClick={() => onAddTimeline(order.id)}
                              >
                                Add timeline update
                              </button>
                            </div>
                          </>
                        ) : null}

                        <div className="order-admin-footer">
                          {order.orderState === "order" ? (
                            <>
                              <a className="wm-btn wm-btn-secondary wm-btn-sm" href={`/track/${order.id}`}>
                                Open tracking page
                              </a>
                              <button
                                className="wm-btn wm-btn-secondary wm-btn-sm"
                                type="button"
                                onClick={() => onCopyLink(order.id)}
                              >
                                {copyLabelByOrder[order.id] || "Copy tracking link"}
                              </button>
                            </>
                          ) : null}
                          {order.websiteUrl ? (
                            <a
                              className="wm-btn wm-btn-success wm-btn-sm"
                              href={order.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open website
                            </a>
                          ) : null}
                          <button className="wm-btn wm-btn-ghost wm-btn-sm" type="button" onClick={() => setOpenId("")}>
                            Close
                          </button>
                        </div>
                      </>
                    ) : null}
                  </article>
                );
              })}
            </div>
          )}

          {filtered.length > PAGE_SIZE ? (
            <nav className="wm-pagination" aria-label="Orders pages">
              <button
                className="wm-btn wm-btn-secondary wm-btn-sm"
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {pageCount}
              </span>
              <button
                className="wm-btn wm-btn-secondary wm-btn-sm"
                type="button"
                disabled={currentPage === pageCount}
                onClick={() => setPage(currentPage + 1)}
              >
                Next
              </button>
            </nav>
          ) : null}
        </>
      ) : null}

      <ConfirmDialog
        open={Boolean(rejectTarget)}
        danger
        title="Reject this lead?"
        text="The lead will be marked as rejected and will not become an order. This cannot be undone from the dashboard."
        confirmLabel="Reject lead"
        busy={Boolean(rejectTarget) && savingOrderId === rejectTarget}
        onConfirm={confirmReject}
        onCancel={() => setRejectTarget(null)}
      />
    </div>
  );
};

export default AdminOrdersPanel;
