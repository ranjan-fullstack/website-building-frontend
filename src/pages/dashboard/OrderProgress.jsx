import { orderStatusOptions } from "./constants";

// Semantic states: complete = green, current = blue, problem = red, upcoming = gray.
const OrderProgress = ({ status, statuses = orderStatusOptions }) => {
  const currentIndex = Math.max(0, statuses.indexOf(status || "New Lead"));
  const isFinished = currentIndex === statuses.length - 1;
  const percent = Math.round(((currentIndex + 1) / statuses.length) * 100);

  return (
    <div className="wm-order-progress">
      <div className="wm-order-progress-head">
        <strong>{percent}% complete</strong>
        <span>
          Step {currentIndex + 1} of {statuses.length}
        </span>
      </div>
      <div
        className={`wm-progress ${isFinished ? "is-complete" : ""}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label="Project progress"
      >
        <span style={{ width: `${percent}%` }} />
      </div>

      <ol className="wm-steps">
        {statuses.map((step, index) => {
          const state =
            index < currentIndex || (isFinished && index === currentIndex)
              ? "is-complete"
              : index === currentIndex
                ? step === "Changes Requested"
                  ? "is-problem"
                  : "is-current"
                : "";

          return (
            <li
              className={`wm-step ${state}`}
              key={step}
              aria-current={index === currentIndex ? "step" : undefined}
            >
              <span className="wm-step-dot" aria-hidden="true">
                {state === "is-complete" ? "✓" : index + 1}
              </span>
              <span>{step}</span>
              {index === currentIndex ? <span className="wm-sr-only">(current step)</span> : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default OrderProgress;
