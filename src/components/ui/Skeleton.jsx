export const Skeleton = ({ height = 16, width = "100%", radius, className = "" }) => (
  <span
    aria-hidden="true"
    className={`wm-skeleton ${className}`}
    style={{ height, width, borderRadius: radius }}
  />
);

const Busy = ({ label = "Loading", className = "", children }) => (
  <div className={className} role="status" aria-live="polite" aria-busy="true">
    <span className="wm-sr-only">{label}…</span>
    {children}
  </div>
);

export const SkeletonCard = ({ lines = 3 }) => (
  <Busy className="wm-card wm-skeleton-card">
    <Skeleton height={20} width="45%" />
    {Array.from({ length: lines }, (_, index) => (
      <Skeleton key={index} width={index === lines - 1 ? "70%" : "100%"} />
    ))}
  </Busy>
);

export const SkeletonTable = ({ rows = 5, label = "Loading table" }) => (
  <Busy className="wm-skeleton-table" label={label}>
    {Array.from({ length: rows }, (_, index) => (
      <div className="wm-skeleton-row" key={index}>
        <Skeleton height={18} width="18%" />
        <Skeleton height={18} width="32%" />
        <Skeleton height={18} width="20%" />
        <Skeleton height={18} width="12%" />
      </div>
    ))}
  </Busy>
);

export const SkeletonPage = ({ label = "Loading page" }) => (
  <Busy className="wm-skeleton-page" label={label}>
    <Skeleton height={34} width="40%" />
    <Skeleton height={16} width="60%" />
    <div className="wm-skeleton-grid">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </Busy>
);

export const SkeletonDashboard = () => (
  <Busy className="wm-skeleton-page" label="Loading dashboard">
    <Skeleton height={30} width="35%" />
    <div className="wm-skeleton-grid wm-skeleton-grid-4">
      <SkeletonCard lines={1} />
      <SkeletonCard lines={1} />
      <SkeletonCard lines={1} />
      <SkeletonCard lines={1} />
    </div>
    <SkeletonTable rows={4} />
  </Busy>
);
