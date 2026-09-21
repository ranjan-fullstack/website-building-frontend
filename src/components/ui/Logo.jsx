import LogoMark from "./LogoMark";

const Logo = ({ href = "/", tagline = "", inverse = false, size = 40 }) => (
  <a className={`wm-logo ${inverse ? "wm-logo-inverse" : ""}`} href={href} aria-label="Appzet Web Solution home">
    <LogoMark size={size} />
    <span className="wm-logo-text">
      <strong>
        Appzet <span className="wm-logo-accent">Web Solution</span>
      </strong>
      {tagline ? <small>{tagline}</small> : null}
    </span>
  </a>
);

export default Logo;
