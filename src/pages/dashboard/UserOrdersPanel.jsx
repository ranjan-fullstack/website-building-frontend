import { useState } from "react";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import { SkeletonDashboard } from "../../components/ui/Skeleton";
import StatusBadge from "../../components/ui/StatusBadge";
import { PanelHeading } from "./DashboardLayout";
import { formatDateTime } from "./constants";
import OrderProgress from "./OrderProgress";
import ProjectTimeline from "./ProjectTimeline";

const nextStepByStatus = {
  "New Lead": "We will contact you on WhatsApp to confirm your order.",
  Contacted: "Share your business details and requirements with us.",
  "Requirements Collected": "We are reviewing your requirements.",
  "Design Started": "Our team is designing your website.",
  "Design Ready": "Your design is ready. We will share it with you for review.",
  "Client Review": "Please review the draft and send us your feedback.",
  "Changes Requested": "We are applying the changes you requested.",
  Finalizing: "We are running final checks before launch.",
  "Website Live": "Your website is live. Open it and share it with your customers.",
  Delivered: "Your website has been delivered. Contact us any time for updates.",
};

const UserOrdersPanel = ({ orders, statuses, loadState, onRetry }) => {
  // null = first (latest) order open by default; "" = all collapsed.
  const [openId, setOpenId] = useState(null);
  const latest = orders[0];
  const activeId = openId === null ? latest?.id : openId;

  return (
    <div className="wm-panel">
      <PanelHeading
        kicker="My website"
        title="Track your website progress"
        text="Follow your website from first contact to going live."
      />

      {loadState === "loading" ? <SkeletonDashboard /> : null}

      {loadState === "error" ? (
        <ErrorState title="Something went wrong" text="We could not load your project information." onRetry={onRetry} />
      ) : null}

      {loadState === "ready" && !orders.length ? (
        <EmptyState
          icon="✦"
          title="No orders yet"
          text="Your website journey will appear here once you place an order. Choose a template to get started."
          actionLabel="Explore Templates"
          actionHref="#/dashboard/templates"
        />
      ) : null}

      {loadState === "ready" && latest ? (
        <>
          <div className="wm-stat-grid">
            <article className="wm-card wm-stat">
              <span>Order status</span>
              <StatusBadge status={latest.status} />
            </article>
            <article className="wm-card wm-stat">
              <span>Current template</span>
              <strong>{latest.template}</strong>
            </article>
            <article className="wm-card wm-stat">
              <span>Website</span>
              {latest.websiteUrl ? (
                <a className="wm-btn wm-btn-success wm-btn-sm" href={latest.websiteUrl} target="_blank" rel="noreferrer">
                  Open website
                </a>
              ) : (
                <strong className="wm-muted">Not published yet</strong>
              )}
            </article>
            <article className="wm-card wm-stat wm-stat-next">
              <span>Next step</span>
              <strong>{nextStepByStatus[latest.status] || "We will keep you updated here."}</strong>
            </article>
          </div>

          <div className="wm-order-list">
            {orders.map((order) => {
              const isOpen = activeId === order.id;

              return (
                <article className="wm-card wm-order-item" key={order.id}>
                  <button
                    className="wm-order-toggle"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? "" : order.id)}
                  >
                    <span>
                      <strong>{order.template}</strong>
                      <small>
                        {order.id}
                        {order.updatedAt ? ` · Updated ${formatDateTime(order.updatedAt)}` : ""}
                      </small>
                    </span>
                    <StatusBadge status={order.status} />
                  </button>

                  {isOpen ? (
                    <div className="wm-order-detail">
                      <section aria-label="Progress">
                        <h2>Progress</h2>
                        <OrderProgress status={order.status} statuses={statuses} />
                      </section>
                      <section aria-label="Updates">
                        <h2>Updates</h2>
                        <ProjectTimeline items={[...(order.timeline || [])].reverse()} />
                      </section>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UserOrdersPanel;
