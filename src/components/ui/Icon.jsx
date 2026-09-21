// Small line-icon set (24px grid, 1.8 stroke) so cards share one visual language.
const paths = {
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z",
  layout: "M4 5h16v14H4V5Zm0 5h16M10 10v9",
  cart: "M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.3a1 1 0 0 0 1-.8L19 8H6M9 20h.01M17 20h.01",
  refresh: "M20 11a8 8 0 0 0-14.3-4.5L4 8m0-4v4h4M4 13a8 8 0 0 0 14.3 4.5L20 16m0 4v-4h-4",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.3-4.3",
  chat: "M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12Z",
  check: "m5 12.5 4.5 4.5L19 7.5",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  shield: "M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6L12 3Zm-3 9 2.3 2.3L15.5 10",
  bolt: "M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z",
  tag: "M3 12V4h8l10 10-8 8L3 12Zm5-4h.01",
  mobile: "M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm4 14h.01",
  users: "M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20m13-9a3 3 0 1 0 0-6m4 15v-1.5a4 4 0 0 0-3-3.9M9.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
};

const Icon = ({ name, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d={paths[name] || paths.globe} />
  </svg>
);

export default Icon;
