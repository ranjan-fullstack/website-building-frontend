import { contact, whatsappLink } from "../../data/site";
import Logo from "./Logo";

const SiteFooter = () => (
  <footer className="wm-footer">
    <div className="wm-container wm-footer-grid">
      <div className="wm-footer-brand">
        <Logo inverse />
        <p>
          Affordable, professional websites for Indian local shops, clinics, gyms, coaching centres and
          service businesses.
        </p>
        <a className="wm-btn wm-btn-whatsapp wm-btn-sm" href={whatsappLink}>
          Chat on WhatsApp
        </a>
      </div>

      <nav aria-label="Explore">
        <h2>Explore</h2>
        <a href="/templates">Templates</a>
        <a href="/services">Services</a>
        <a href="/#pricing">Pricing</a>
        <a href="/#how-it-works">How it works</a>
        <a href="/#faq">FAQ</a>
      </nav>

      <nav aria-label="Company">
        <h2>Company</h2>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-and-conditions">Terms and Conditions</a>
        <a href="/login">Login</a>
      </nav>

      <address>
        <h2>Contact</h2>
        <a href={contact.phoneHref}>{contact.phone}</a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <p>{contact.address}</p>
        <p>{contact.hours}</p>
      </address>
    </div>
    <div className="wm-container wm-footer-bottom">
      <p>© {new Date().getFullYear()} Appzet Web Solution. Built for local Indian businesses.</p>
    </div>
  </footer>
);

export default SiteFooter;
