const EmptyState = ({ title, text, actionLabel, actionHref, onAction, icon = "○" }) => (
  <div className="wm-empty">
    <span className="wm-empty-icon" aria-hidden="true">
      {icon}
    </span>
    <h3>{title}</h3>
    {text ? <p>{text}</p> : null}
    {actionLabel && actionHref ? (
      <a className="wm-btn wm-btn-primary" href={actionHref}>
        {actionLabel}
      </a>
    ) : null}
    {actionLabel && onAction ? (
      <button className="wm-btn wm-btn-primary" type="button" onClick={onAction}>
        {actionLabel}
      </button>
    ) : null}
  </div>
);

export default EmptyState;
