import { useId } from "react";

// Isometric 3D cube: blue (left face), purple (right face), green (top face) with a
// white "A" on the front. Purely decorative (aria-hidden); the brand name is the text label.
const LogoMark = ({ size = 40, animated = true, className = "" }) => {
  const uid = useId().replace(/:/g, "");
  const left = `wm-l-${uid}`;
  const right = `wm-r-${uid}`;
  const top = `wm-t-${uid}`;
  const clip = `wm-c-${uid}`;
  const shine = `wm-s-${uid}`;

  return (
    <span
      className={`wm-mark ${animated ? "is-animated" : ""} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" width={size} height={size} focusable="false">
        <defs>
          <linearGradient id={left} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#60a5fa" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id={right} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#6d28d9" />
          </linearGradient>
          <linearGradient id={top} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#86efac" />
            <stop offset="1" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id={shine} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={clip}>
            <path d="M32 4 58 19v30L32 62 6 49V19Z" />
          </clipPath>
        </defs>

        <g className="wm-mark-cube">
          {/* faces */}
          <path d="M6 19 32 34v28L6 49Z" fill={`url(#${left})`} />
          <path d="M58 19 32 34v28l26-13Z" fill={`url(#${right})`} />
          <path d="M32 4 58 19 32 34 6 19Z" fill={`url(#${top})`} />

          {/* edge highlights for depth */}
          <path d="M6 19 32 34 58 19" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1" />
          <path d="M32 34v28" stroke="#fff" strokeOpacity="0.35" strokeWidth="1" />

          {/* white "A" across the two front faces */}
          <path
            d="M17 47 32 24l15 23M23 40h18"
            fill="none"
            stroke="#fff"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(0 4)"
            opacity="0.96"
          />

          {/* moving light sweep */}
          <g clipPath={`url(#${clip})`}>
            <rect className="wm-mark-shine" x="-30" y="-6" width="22" height="80" fill={`url(#${shine})`} transform="skewX(-20)" />
          </g>
        </g>
      </svg>
    </span>
  );
};

export default LogoMark;
