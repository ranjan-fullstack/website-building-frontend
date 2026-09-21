import { useCallback, useEffect, useState } from "react";
import "../styles/ui.css";
import "../styles/Marketing.css";
import "../styles/TrackOrder.css";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import { SkeletonPage } from "../components/ui/Skeleton";
import SiteFooter from "../components/ui/SiteFooter";
import SiteHeader from "../components/ui/SiteHeader";
import StatusBadge from "../components/ui/StatusBadge";
import { apiRequest } from "../services/api";
import { orderStatusOptions } from "./dashboard/constants";
import OrderProgress from "./dashboard/OrderProgress";
import ProjectTimeline from "./dashboard/ProjectTimeline";

const TrackOrder = ({ hash }) => {
  const orderId = hash.replace(/^#?\/?track\/?/, "").split("?")[0];
  const [order, setOrder] = useState(null);
  const [statuses, setStatuses] = useState(orderStatusOptions);
  const [loadState, setLoadState] = useState("loading"); // loading | ready | not-found | error
  const [copyLabel, setCopyLabel] = useState("Copy tracking link");

  const load = useCallback(() => {
    apiRequest(`/orders/${encodeURIComponent(orderId)}`)
      .then((data) => {
        setOrder(data.order);
        setStatuses(data.statuses || orderStatusOptions);
        setLoadState("ready");
      })
      .catch((error) => setLoadState(error.status === 404 ? "not-found" : "error"));
  }, [orderId]);

  useEffect(() => {
    load();
  }, [load]);

  const retry = () => {
    setLoadState("loading");
    load();
  };

  const copyTrackingLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/track/${orderId}`);
      setCopyLabel("Link copied");
    } catch {
      setCopyLabel("Copy failed");
    }

    window.setTimeout(() => setCopyLabel("Copy tracking link"), 1800);
  };

  return (
    <div className="wm-page">
      <SiteHeader />

      <main id="main-content" className="wm-container track-main">
        {loadState === "loading" ? <SkeletonPage label="Loading your order" /> : null}

        {loadState === "not-found" ? (
          <EmptyState
            title="We could not find this tracking page"
            text="Please check the tracking link you were sent. If you think this is a mistake, contact Appzet Web Solution on WhatsApp."
            actionLabel="Explore templates"
            actionHref="/templates"
          />
        ) : null}

        {loadState === "error" ? (
          <ErrorState
            title="Something went wrong"
            text="We could not load your project information."
            onRetry={retry}
          />
        ) : null}

        {loadState === "ready" && order ? (
          <>
            <section className="wm-card track-summary">
              <div>
                <p className="wm-eyebrow">Tracking ID {order.id}</p>
                <h1 className="track-title">{order.template} website</h1>
                <p className="track-status-line">
                  Current status: <StatusBadge status={order.status} />
                </p>
              </div>
              <div className="track-actions">
                {order.websiteUrl ? (
                  <a className="wm-btn wm-btn-success" href={order.websiteUrl} target="_blank" rel="noreferrer">
                    Open website
                  </a>
                ) : null}
                <button className="wm-btn wm-btn-secondary" type="button" onClick={copyTrackingLink}>
                  {copyLabel}
                </button>
              </div>
            </section>

            <div className="track-grid">
              <section className="wm-card" aria-labelledby="progress-heading">
                <h2 id="progress-heading" className="track-h2">
                  Project progress
                </h2>
                <OrderProgress status={order.status} statuses={statuses} />
              </section>

              <section className="wm-card" aria-labelledby="timeline-heading">
                <h2 id="timeline-heading" className="track-h2">
                  Project updates
                </h2>
                <ProjectTimeline items={[...(order.timeline || [])].reverse()} />
              </section>
            </div>
          </>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
};

export default TrackOrder;
