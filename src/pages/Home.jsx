import "../styles/Home.css";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

const whatsappLink =
  "https://wa.me/917995590740?text=Hi%20WebMitra%2C%20I%20want%20to%20create%20a%20website%20for%20my%20business.";

const features = [
  "Free setup",
  "Custom domain",
  "Mobile friendly",
  "Basic SEO",
  "WhatsApp integration",
  "Fast support",
];

const steps = [
  {
    number: "01",
    title: "Choose your plan",
    text: "Pick the package that matches your business goals and budget.",
  },
  {
    number: "02",
    title: "Share your business details",
    text: "Send your logo, photos, services, and contact details in one simple flow.",
  },
  {
    number: "03",
    title: "Launch and collect leads",
    text: "We design, refine, and publish your site so customers can reach you fast.",
  },
];

const benefits = [
  {
    title: "Low monthly pricing",
    text: "Get online without paying a heavy one-time agency fee or premium global-builder pricing.",
  },
  {
    title: "Done-for-you setup",
    text: "No coding, no confusion, and no need to manage technical tools yourself.",
  },
  {
    title: "Built for real leads",
    text: "Inquiry forms and WhatsApp buttons turn visitors into conversations.",
  },
  {
    title: "Easy updates",
    text: "Need a change later? We help you keep your website fresh and active.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    details: "3 pages • Subdomain • Branding visible",
    tag: "Start free and test your idea",
  },
  {
    name: "Launch",
    price: "249",
    details: "5 pages • Mobile-ready • WhatsApp",
    tag: "Cheaper than many premium builders",
  },
  {
    name: "Growth",
    price: "499",
    details: "15 pages • Blog • Priority support",
    tag: "Best value for local businesses",
    featured: true,
  },
  {
    name: "Business",
    price: "999",
    details: "Advanced features • Faster revisions",
    tag: "For scaling Indian brands",
  },
];

const pricingTableRows = [
  ["Basic website builder", "Yes", "Yes", "Yes", "Yes"],
  ["Mobile-ready site", "Yes", "Yes", "Yes", "Yes"],
  ["Basic templates", "Yes", "Yes", "Yes", "Yes"],
  ["Subdomain", "Yes", "Yes", "Yes", "Yes"],
  ["Your branding visible", "Yes", "No", "No", "No"],
  ["Custom domain", "No", "Yes", "Yes", "Yes"],
  ["Number of pages", "3", "5", "15", "25 or more"],
  ["WhatsApp button", "Yes", "Yes", "Yes", "Yes"],
  ["Contact form", "Yes", "Yes", "Yes", "Yes"],
  ["SEO basics", "No or limited", "Yes", "Yes", "Yes"],
  ["Testimonials / gallery", "No", "Basic", "Full", "Full"],
  ["Blog / updates", "No", "No", "Yes", "Yes"],
  ["Premium templates", "No", "Limited", "Yes", "Yes"],
  ["Faster support", "No", "Basic", "Faster", "Priority"],
  ["Analytics help", "No", "No", "Basic", "Advanced"],
  ["Custom sections / edits", "No", "Limited", "More", "Best access"],
];

const testimonials = [
  "Cheaper than premium global builders for businesses that mainly need a strong branded website.",
  "More supportive than pure DIY tools because we help with setup, structure, and launch.",
  "Better matched to Indian small businesses that want leads, trust, and WhatsApp enquiries fast.",
];

const faqs = [
  {
    question: "Why choose this over Wix or Hostinger?",
    answer:
      "Because many small businesses do not want to learn a builder. We focus on affordable done-for-you delivery, not just software access.",
  },
  {
    question: "Why choose this over Dukaan or Instamojo?",
    answer:
      "Those tools are strong for stores and payments. We are better when your business needs a fuller website presence and stronger brand trust.",
  },
  {
    question: "Can customers contact me on WhatsApp?",
    answer:
      "Yes, WhatsApp integration stays central because quick enquiries matter for Indian small businesses.",
  },
];

const Home = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="home-page">
     <header className="header">

  <div className="brand-mark">
    <div className="brand-badge">WM</div>
    <div>
      <p className="brand-name">WebMitra</p>
      <span className="brand-subtitle">
        Websites for growing local businesses
      </span>
    </div>
  </div>

  {/* HAMBURGER */}
  <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
    {menuOpen ? "✕" : "☰"}
  </div>

  {/* DESKTOP NAV */}
  <nav className="nav-links desktop-only">
    <a href="#pricing">Pricing</a>
    <a href="#how-it-works">How it works</a>
    <a href="#/templates">Templates</a>
    <a href="#/about">About</a>
    <a href="#/contact">Contact</a>
    <a href="#faq">FAQ</a>
  </nav>

  <div className="header-actions desktop-only">
    {isAuthenticated ? (
      <>
        <a className="account-pill" href="#/dashboard">
          {user?.avatar ? <img src={user.avatar} alt="" /> : null}
          <span>{user?.name || "My account"}</span>
          <small>{user?.role}</small>
        </a>
        <button className="btn btn-secondary" onClick={logout}>
          Sign out
        </button>
      </>
    ) : (
      <a className="btn btn-secondary" href="#/login">
        Google Sign-In
      </a>
    )}
    <a className="btn btn-primary" href={whatsappLink}>
      Talk on WhatsApp
    </a>
  </div>

  {/* MOBILE MENU */}
  <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
    <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
    <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
    <a href="#/templates">Templates</a>
    <a href="#/about" onClick={() => setMenuOpen(false)}>About</a>
    <a href="#/contact" onClick={() => setMenuOpen(false)}>Contact</a>
    <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>

    {isAuthenticated ? (
      <>
        <a className="account-pill" href="#/dashboard">
          {user?.avatar ? <img src={user.avatar} alt="" /> : null}
          <span>{user?.name || "My account"}</span>
        </a>
        <button className="btn btn-secondary" onClick={logout}>
          Sign out
        </button>
      </>
    ) : (
      <a className="btn btn-secondary" href="#/login">
        Google Sign-In
      </a>
    )}

    <a className="btn btn-primary" href={whatsappLink}>
      Talk on WhatsApp
    </a>
  </div>

</header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Built for Indian small businesses</p>
            <h1>India-first website service that beats complicated builders on value</h1>
            <p className="hero-text">
              Wix, Hostinger, GoDaddy, Dukaan, and Instamojo make you do more
              yourself. We help Indian businesses launch faster with done-for-you
              setup, affordable monthly pricing, and a site that is built to look
              professional from day one.
            </p>

            <div className="hero-buttons">
              <a className="btn btn-primary" href={whatsappLink}>
                Talk on WhatsApp
              </a>
              <a className="btn btn-secondary" href="#pricing">
                See Pricing
              </a>
            </div>

            <p className="trust-line">Done-for-you • Mobile-ready • Built for leads</p>

            <div className="hero-stats">
              <div>
                <strong>₹249</strong>
                <span>Starter monthly pricing</span>
              </div>
              <div>
                <strong>48 hrs</strong>
                <span>Fast launch target</span>
              </div>
              <div>
                <strong>8</strong>
                <span>Key competitors studied</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card hero-card-main">
              <span className="mini-label">Featured layout</span>
              <h3>Modern local-business site</h3>
              <p>
                Made to help Indian businesses look credible, feel easy to contact,
                and convert visitors into enquiries.
              </p>
              <div className="mini-preview-grid">
                <div className="preview-panel tall"></div>
                <div className="preview-panel"></div>
                <div className="preview-panel"></div>
                <div className="preview-panel wide"></div>
              </div>
            </div>

            <div className="hero-floating-card">
              <p>Our position</p>
              <strong>
                Cheaper than premium builders. More supportive than DIY tools.
              </strong>
            </div>
          </div>
        </section>

        <section className="trust">
          <p className="section-kicker">Trusted essentials</p>
          <h2>What makes us the better fit for Indian, budget-conscious businesses</h2>
          <div className="feature-pills">
            {features.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
        </section>

        <section className="how" id="how-it-works">
          <p className="section-kicker">How it works</p>
          <h2>How we make it easier than building on software yourself</h2>
          <div className="cards three-column">
            {steps.map((step) => (
              <article className="info-card step-card" key={step.number}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="why">
          <p className="section-kicker">Why choose us</p>
          <h2>Why we can become the best cheap website builder for Indian businesses</h2>
          <div className="cards two-column">
            {benefits.map((benefit) => (
              <article className="info-card" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pricing" id="pricing">
          <p className="section-kicker">Price advantage</p>
          <h2>Simple pricing that stays below premium global builders</h2>
          <p className="pricing-intro">
            The strongest positioning is not claiming we are the cheapest
            software on earth. It is showing that we are one of the cheapest
            done-for-you options for Indian small businesses.
          </p>
          <div className="cards pricing-grid">
            {pricingPlans.map((plan) => (
              <article
                className={`price-card ${plan.featured ? "highlight" : ""}`}
                key={plan.name}
              >
                <span className="plan-tag">{plan.tag}</span>
                <h3>{plan.name}</h3>
                <h4>
                  <span className="currency">₹</span>
                  {plan.price}
                  <small>/month</small>
                </h4>
                <p>{plan.details}</p>
                {plan.name === "Free" ? (
                  <a className="btn btn-primary" href="#/templates">
                    Start Free
                  </a>
                ) : (
                  <a className="btn btn-primary" href={whatsappLink}>
                    Talk on WhatsApp
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="pricing-table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Free</th>
                  <th>₹249 Starter</th>
                  <th>₹499 Growth</th>
                  <th>₹999 Business</th>
                </tr>
              </thead>
              <tbody>
                {pricingTableRows.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                    <td>{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="testimonials">
          <p className="section-kicker">Value promise</p>
          <h2>The promise we should keep repeating across the page</h2>
          <div className="cards three-column">
            {testimonials.map((quote) => (
              <article className="testimonial-card" key={quote}>
                <span className="quote-mark">“</span>
                <p>{quote}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="faq" id="faq">
          <p className="section-kicker">FAQ</p>
          <h2>Questions buyers will ask when comparing us with builders</h2>
          <div className="faq-list">
            {faqs.map((item) => (
              <article className="faq-item" key={item.question}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta">
          <div className="cta-panel">
            <div>
              <p className="section-kicker">Ready to launch?</p>
              <h2>
                Position your brand as the affordable Indian alternative to
                expensive or DIY website builders
              </h2>
            </div>
            <a className="btn btn-primary" href={whatsappLink}>
              Talk on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="home-footer">

  <div className="home-footer-brand">
    <div className="brand-badge">WM</div>
    <div>
      <strong>WebMitra</strong>
      <p>
        Affordable websites for Indian local shops, service businesses,
        clinics, gyms, coaching centres, and showrooms.
      </p>
    </div>
  </div>

  <div className="home-footer-column">
    <h3>Explore</h3>
    <a href="#/templates">Templates</a>
    <a href="#pricing">Pricing</a>
    <a href="#how-it-works">How it works</a>
    <a href="#faq">FAQ</a>
  </div>

  <div className="home-footer-column">
    <h3>Company</h3>
    <a href="#/about">About</a>
    <a href="#/contact">Contact</a>
    <a href="#/privacy">Privacy Policy</a>
    <a href="#/login">Google Sign-In</a>
  </div>

  <div className="home-footer-column">
    <h3>Contact</h3>

    <a href="tel:+917995590740">📞 +91 7995590740</a>

    <p>
      📧 
      <a href="mailto:rksahu4455@gmail.com">
        rksahu4455@gmail.com
      </a>
    </p>

    <p>
      📍 No.305, Block-B,<br />
      Deccan Prakruti Apartment,<br />
      Egattur, Chennai, Tamil Nadu ,600130
    </p>

    <a className="home-footer-whatsapp" href={whatsappLink}>
      Talk on WhatsApp
    </a>
  </div>

  <div className="home-footer-column">
    <h3>Trust</h3>
    <a href="#/privacy">Privacy Policy</a>
    <a href="#/about">About WebMitra</a>
    <a href="#/contact">Official contact</a>
    <div className="home-social-row">
      <a href="https://facebook.com" aria-label="Facebook">f</a>
      <a href="https://instagram.com" aria-label="Instagram">◎</a>
      <a href="https://twitter.com" aria-label="Twitter">x</a>
      <a href="https://youtube.com" aria-label="YouTube">▶</a>
    </div>

    <p className="home-footer-copy">
      © 2026 WebMitra. Built for local Indian businesses.
    </p>
  </div>

</footer>
    </div>
  );
};

export default Home;
