import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../services/api";
import "../styles/TrackOrder.css";

const fallbackStatuses = [
  "New Lead",
  "Contacted",
  "Requirements Collected",
  "Design Started",
  "Design Ready",
  "Client Review",
  "Changes Requested",
  "Finalizing",
  "Website Live",
  "Delivered",
];

const formatDateTime = (value) => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const TrackOrder = ({ hash }) => {
  const orderId = hash.replace(/^#?\/?track\/?/, "");
  const [order, setOrder] = useState(null);
  const [statuses, setStatuses] = useState(fallbackStatuses);
  const [error, setError] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy tracking link");

  const currentIndex = useMemo(
    () => Math.max(0, statuses.indexOf(order?.status || "New Lead")),
    [order?.status, statuses]
  );

  useEffect(() => {
    if (!orderId) {
      return;
    }

    apiRequest(`/orders/${orderId}`)
      .then((data) => {
        setError("");
        setOrder(data.order);
        setStatuses(data.statuses || fallbackStatuses);
      })
      .catch((fetchError) => setError(fetchError.message));
  }, [orderId]);

  const copyTrackingLink = async () => {
    const trackingLink = `${window.location.origin}/track/${orderId}`;

    try {
      await navigator.clipboard.writeText(trackingLink);
      setCopyLabel("Copied");
      window.setTimeout(() => setCopyLabel("Copy tracking link"), 1600);
    } catch {
      setCopyLabel("Copy failed");
    }
  };

  return (
    <main className="track-page">
      <section className="track-shell">
        <header className="track-header">
          <a className="track-brand" href="#/">
            <span>WM</span>
            <strong>WebMitra</strong>
          </a>
          <a href="#/templates">Choose another template</a>
        </header>

        {error ? (
          <div className="track-error">
            <p>We could not find this tracking page.</p>
            <strong>{error}</strong>
          </div>
        ) : null}

        {!order && !error ? <p className="track-loading">Loading order...</p> : null}

        {order ? (
          <>
            <section className="track-hero">
              <div>
                <p className="track-kicker">Tracking ID {order.id}</p>
                <h1>{order.template} website build</h1>
                <p>
                  Current status: <strong>{order.status}</strong>
                </p>
              </div>
              <div className="track-actions">
                <button type="button" onClick={copyTrackingLink}>
                  {copyLabel}
                </button>
                {order.websiteUrl ? (
                  <a href={order.websiteUrl} target="_blank" rel="noreferrer">
                    Open website
                  </a>
                ) : null}
              </div>
            </section>

            <section className="track-progress-card">
              <div className="track-progress-bar">
                <span
                  style={{
                    width: `${((currentIndex + 1) / statuses.length) * 100}%`,
                  }}
                ></span>
              </div>
              <div className="track-steps">
                {statuses.map((status, index) => (
                  <span
                    className={index <= currentIndex ? "complete" : ""}
                    key={status}
                  >
                    {status}
                  </span>
                ))}
              </div>
            </section>

            <section className="track-timeline">
              <div className="track-section-heading">
                <p className="track-kicker">Timeline</p>
                <h2>Step-by-step project updates</h2>
              </div>
              {order.timeline.map((item) => (
                <article className="track-timeline-item" key={item._id || item.createdAt}>
                  <span></span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>
                      {item.status} {item.createdAt ? `- ${formatDateTime(item.createdAt)}` : ""}
                    </small>
                    {item.note ? <p>{item.note}</p> : null}
                  </div>
                </article>
              ))}
            </section>
          </>
        ) : null}
      </section>
    </main>
  );
};

export default TrackOrder;
