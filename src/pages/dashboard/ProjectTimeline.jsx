import StatusBadge from "../../components/ui/StatusBadge";
import { formatDateTime } from "./constants";

const ProjectTimeline = ({ items = [] }) => (
  <ol className="wm-timeline">
    {items.map((item, index) => (
      <li className="wm-timeline-item" key={item._id || item.createdAt || index}>
        <span className="wm-timeline-dot" aria-hidden="true" />
        <div>
          <div className="wm-timeline-head">
            <strong>{item.title}</strong>
            <StatusBadge status={item.status} />
          </div>
          {item.note ? <p>{item.note}</p> : null}
          {item.createdAt ? <time dateTime={item.createdAt}>{formatDateTime(item.createdAt)}</time> : null}
        </div>
      </li>
    ))}
  </ol>
);

export default ProjectTimeline;
