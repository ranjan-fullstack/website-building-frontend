import { scrollToSection } from "./utils";

const Footer = ({ clientName, logo }) => {
  return (
    <footer className="border-t border-white/10 bg-dark px-5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <img src={logo} alt={clientName} className="h-9 w-9 rounded-full object-cover" />
          <strong className="text-white">{clientName}</strong>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-slate-300">
          <a href="#about" onClick={scrollToSection("about")} className="hover:text-white">
            About
          </a>
          <a href="#services" onClick={scrollToSection("services")} className="hover:text-white">
            Services
          </a>
          <a href="#contact" onClick={scrollToSection("contact")} className="hover:text-white">
            Contact
          </a>
        </nav>

        <p className="text-xs text-slate-500">Powered by WebMitra</p>
      </div>
    </footer>
  );
};

export default Footer;
