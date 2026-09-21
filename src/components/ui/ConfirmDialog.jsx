import { useEffect, useRef } from "react";

// Accessible confirmation modal built on the native <dialog> element
// (focus trap, Escape to close and backdrop are handled by the browser).
const ConfirmDialog = ({
  open,
  title,
  text,
  confirmLabel = "Confirm",
  danger = false,
  busy = false,
  onConfirm,
  onCancel,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog ref={ref} className="wm-dialog" onCancel={onCancel} aria-labelledby="wm-dialog-title">
      <h2 id="wm-dialog-title">{title}</h2>
      <p>{text}</p>
      <div className="wm-dialog-actions">
        <button className="wm-btn wm-btn-secondary" type="button" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button
          className={`wm-btn ${danger ? "wm-btn-danger" : "wm-btn-primary"}`}
          type="button"
          onClick={onConfirm}
          disabled={busy}
        >
          {busy ? "Working..." : confirmLabel}
        </button>
      </div>
    </dialog>
  );
};

export default ConfirmDialog;
