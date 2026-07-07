import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { scrollToSection, telHref } from "./utils";

const navLinks = [
  ["About", "about"],
  ["Programs & Fees", "programs-fees"],
  ["Admission", "admission"],
  ["Contact", "contact"],
];

const SiteNav = ({ clientName, initials, phone, slug }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const accountHref = isAuthenticated
    ? "#/dashboard/submissions"
    : `#/login${slug ? `?from=${slug}` : ""}`;
  const accountLabel = isAuthenticated ? "Dashboard" : "Academy Login";

  const handleNavClick = (sectionId) => (event) => {
    setMobileOpen(false);
    scrollToSection(sectionId)(event);
  };

  return (
    <header className="font-poppins sticky top-0 z-40 border-b border-white/10 bg-dark backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <a
          href="#home"
          onClick={handleNavClick("home")}
          className="flex min-w-0 items-center gap-3"
        >
          <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-gold font-extrabold text-dark">
            {initials}
          </span>
          <span className="truncate text-lg font-bold text-white">{clientName}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={handleNavClick(id)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white! transition hover:bg-white/10"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={accountHref}
            className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold text-white! transition hover:bg-white/10"
          >
            {accountLabel}
          </a>
          <a
            href="#admission"
            onClick={handleNavClick("admission")}
            className="rounded-full bg-cta px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cta/30 transition hover:bg-cta-dark"
          >
            Enquire Now
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((isOpen) => !isOpen)}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white md:hidden"
        >
          <span className="sr-only">Menu</span>
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={handleNavClick(id)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-white! hover:bg-white/10"
                >
                  {label}
                </a>
              ))}
              <a
                href="#admission"
                onClick={handleNavClick("admission")}
                className="mt-2 rounded-full bg-cta px-5 py-3 text-center text-sm font-bold text-white"
              >
                Enquire Now
              </a>
              <a
                href={accountHref}
                className="rounded-full border border-white/20 px-5 py-3 text-center text-sm font-bold text-white!"
              >
                {accountLabel}
              </a>
              <a
                href={telHref(phone)}
                className="rounded-full border border-white/20 px-5 py-3 text-center text-sm font-bold text-white"
              >
                Call {phone}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default SiteNav;
