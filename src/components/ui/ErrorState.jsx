const ErrorState = ({
  title = "Something went wrong",
  text = "We could not load this information. Please try again.",
  onRetry,
  compact = false,
}) => (
  <div className={`wm-error-state ${compact ? "wm-error-compact" : ""}`} role="alert">
    <span className="wm-error-icon" aria-hidden="true">
      !
    </span>
    <div>
      <h3>{title}</h3>
      <p>{text}</p>
      {onRetry ? (
        <button className="wm-btn wm-btn-secondary wm-btn-sm" type="button" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  </div>
);

export default ErrorState;
