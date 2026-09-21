// Semantic status colours: green = complete/live, blue = active, purple = design,
// red = problem, gray = inactive.
const toneByStatus = {
  "New Lead": "gray",
  Contacted: "blue",
  "Requirements Collected": "blue",
  "Design Started": "purple",
  "Design Ready": "purple",
  "Client Review": "blue",
  "Changes Requested": "red",
  Finalizing: "blue",
  "Website Live": "green",
  Delivered: "green",
  Lead: "gray",
  Rejected: "red",
  Pending: "gray",
  Paid: "green",
  Failed: "red",
  Refunded: "purple",
  Live: "green",
  Draft: "gray",
  Maintenance: "blue",
  active: "green",
  paused: "gray",
  new: "blue",
  contacted: "blue",
  confirmed: "purple",
  joined: "green",
  closed: "gray",
};

const StatusBadge = ({ status, tone }) => (
  <span className={`wm-badge wm-badge-${tone || toneByStatus[status] || "gray"}`}>{status}</span>
);

export default StatusBadge;
