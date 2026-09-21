import "../styles/ui.css";
import "../styles/Marketing.css";
import Icon from "../components/ui/Icon";
import Reveal from "../components/ui/Reveal";
import SiteFooter from "../components/ui/SiteFooter";
import SiteHeader from "../components/ui/SiteHeader";
import TemplateCard from "../components/ui/TemplateCard";
import { whatsappLink } from "../data/site";
import { templateCatalog } from "../data/templateCatalog";

const trustPoints = [
  ["mobile", "Mobile Responsive"],
  ["search", "SEO Ready"],
  ["chat", "WhatsApp Ready"],
  ["bolt", "Fast Delivery"],
  ["tag", "Affordable"],
];

const journey = [
  ["Choose a Template", "Browse designs made for your kind of business and preview them."],
  ["Tell Us About Your Business", "Share your logo, photos, services and contact details."],
  ["We Build Your Website", "We customise the template with your content and branding."],
  ["Review & Approve", "Check the draft, ask for changes and approve when happy."],
  ["Go Live", "We publish your website so customers can find and contact you."],
];

const services = [
  ["globe", "Business Website", "Professional websites for local businesses.", ""],
  ["layout", "Landing Page", "Conversion-focused landing pages.", ""],
  ["cart", "E-Commerce", "Online stores for your products.", ""],
  ["refresh", "Website Redesign", "Modernize your existing website.", "purple"],
  ["search", "SEO Setup", "Search-engine-ready website structure.", ""],
  ["chat", "WhatsApp Integration", "Help customers contact your business directly.", "green"],
];

const businessTypes = [
  "Restaurants",
  "Salons",
  "Gyms",
  "Coaching Centers",
  "Schools",
  "Clinics",
  "Real Estate",
  "Local Shops",
  "Service Businesses",
  "Freelancers",
  "Small Companies",
];

const benefits = [
  ["tag", "Low monthly pricing", "Get online without a heavy one-time agency fee."],
  ["users", "Done-for-you setup", "No coding and no technical tools to manage yourself."],
  ["chat", "Built for real enquiries", "Enquiry forms and WhatsApp buttons turn visitors into conversations."],
  ["refresh", "Easy updates", "Need a change later? We help you keep your website fresh."],
];

const pricingPlans = [
  { name: "Free", price: "0", details: "3 pages • Subdomain • Appzet Web Solution branding visible", tag: "Start free" },
  { name: "Launch", price: "249", details: "5 pages • Mobile-ready • WhatsApp", tag: "For new businesses" },
  {
    name: "Growth",
    price: "499",
    details: "15 pages • Blog • Priority support",
    tag: "Best value for local businesses",
    featured: true,
  },
  { name: "Business", price: "999", details: "Advanced features • Faster revisions", tag: "For growing brands" },
];

const pricingTableRows = [
  ["Basic website builder", "Yes", "Yes", "Yes", "Yes"],
  ["Mobile-ready site", "Yes", "Yes", "Yes", "Yes"],
  ["Basic templates", "Yes", "Yes", "Yes", "Yes"],
  ["Subdomain", "Yes", "Yes", "Yes", "Yes"],
  ["Your branding visible", "Yes", "No", "No", "No"],
  ["Custom domain", "No", "No", "Yes", "Yes"],
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

const faqs = [
  [
    "Do I need technical knowledge?",
    "No. We handle the setup for you. You share your business details and we build and publish the website.",
  ],
  [
    "Can customers contact me on WhatsApp?",
    "Yes. WhatsApp buttons and enquiry forms are part of the templates so customers can reach you quickly.",
  ],
  [
    "Can I track my website's progress?",
    "Yes. Sign in to your account to see every stage of your order, from first contact to going live.",
  ],
  [
    "Can I use my own domain?",
    "Custom domains are included in the Growth and Business plans. Other plans use an Appzet Web Solution subdomain.",
  ],
];

const Home = () => (
  <div className="wm-page">
    <SiteHeader />

    <main id="main-content">
      <section className="wm-hero">
        <div className="wm-container wm-hero-grid">
          <div>
            <p className="wm-eyebrow">Websites for Indian local businesses</p>
            <h1 className="wm-h1">
              Build Your Business Online With <span className="wm-gradient-text">Appzet Web Solution</span>
            </h1>
            <p className="wm-lead">
              Professional websites for local businesses, startups and growing brands — without the
              complexity or agency-level cost.
            </p>
            <div className="wm-hero-actions">
              <a className="wm-btn wm-btn-primary wm-btn-lg" href="/templates">
                Get Your Website
              </a>
              <a className="wm-btn wm-btn-secondary wm-btn-lg" href="/templates">
                Explore Templates
              </a>
            </div>
            <ul className="wm-check-list" aria-label="What you get">
              {["Mobile Responsive", "SEO Ready", "WhatsApp Ready", "Fast Delivery", "Affordable"].map((item) => (
                <li key={item}>
                  <Icon name="check" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="wm-hero-visual" aria-hidden="true">
            <div className="wm-browser">
              <div className="wm-browser-bar">
                <i />
                <i />
                <i />
                <span>yourbusiness.com</span>
              </div>
              <div className="wm-browser-body">
                <div className="wm-browser-nav">
                  <strong>Your Business</strong>
                  <span>
                    <span>Services</span>
                    <span>About</span>
                    <span>Contact</span>
                  </span>
                </div>
                <div className="wm-browser-hero">
                  <b>Modern Design</b>
                  <span>A professional website that helps customers find and contact you.</span>
                  <em>Contact on WhatsApp</em>
                </div>
                <div className="wm-browser-tiles">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
            <div className="wm-phone">
              <div className="wm-phone-screen">
                <i />
                <b />
                <b />
                <b />
              </div>
            </div>
            <div className="wm-hero-tags">
              <span className="wm-badge wm-badge-blue">Mobile</span>
              <span className="wm-badge wm-badge-purple">SEO</span>
              <span className="wm-badge wm-badge-green">WhatsApp</span>
            </div>
          </div>
        </div>
      </section>

      <section className="wm-section wm-section-alt" aria-labelledby="trust-heading">
        <div className="wm-container">
          <h2 id="trust-heading" className="wm-sr-only">
            What every Appzet Web Solution website includes
          </h2>
          <div className="wm-trust-grid">
            {trustPoints.map(([icon, label]) => (
              <div className="wm-trust-item" key={label}>
                <span className="wm-icon-tile green">
                  <Icon name={icon} size={20} />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wm-section" id="how-it-works" aria-labelledby="how-heading">
        <div className="wm-container">
          <Reveal className="wm-section-head">
            <p className="wm-eyebrow">How it works</p>
            <h2 id="how-heading" className="wm-h2">
              From idea to live website in five simple steps
            </h2>
            <p className="wm-lead">No technical knowledge needed — we guide you through every step.</p>
          </Reveal>
          <ol className="wm-journey">
            {journey.map(([title, text], index) => (
              <Reveal as="li" key={title} delay={index * 0.06}>
                <span className="wm-journey-num">{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="wm-section wm-section-alt" aria-labelledby="templates-heading">
        <div className="wm-container">
          <Reveal className="wm-section-head">
            <p className="wm-eyebrow">Templates</p>
            <h2 id="templates-heading" className="wm-h2">
              Designs made for local businesses
            </h2>
            <p className="wm-lead">Preview a template, then choose the one that fits your business.</p>
          </Reveal>
          <div className="wm-template-grid">
            {templateCatalog.slice(0, 6).map((template) => (
              <TemplateCard key={template.slug} template={template} />
            ))}
          </div>
          <p style={{ marginTop: 32, textAlign: "center" }}>
            <a className="wm-btn wm-btn-secondary" href="/templates">
              View all templates
            </a>
          </p>
        </div>
      </section>

      <section className="wm-section" aria-labelledby="services-heading">
        <div className="wm-container">
          <Reveal className="wm-section-head">
            <p className="wm-eyebrow">Services</p>
            <h2 id="services-heading" className="wm-h2">
              Everything your business needs online
            </h2>
          </Reveal>
          <div className="wm-grid wm-grid-3">
            {services.map(([icon, title, text, tone], index) => (
              <Reveal className="wm-card wm-service" key={title} delay={index * 0.05}>
                <span className={`wm-icon-tile ${tone}`}>
                  <Icon name={icon} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wm-section wm-section-alt" aria-labelledby="who-heading">
        <div className="wm-container">
          <Reveal className="wm-section-head">
            <p className="wm-eyebrow">Built for India</p>
            <h2 id="who-heading" className="wm-h2">
              Made for the businesses that power local India
            </h2>
            <p className="wm-lead">
              Templates, WhatsApp enquiries and simple pricing designed around how Indian businesses
              actually get customers.
            </p>
          </Reveal>
          <ul className="wm-business-types">
            {businessTypes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wm-section" aria-labelledby="why-heading">
        <div className="wm-container">
          <Reveal className="wm-section-head">
            <p className="wm-eyebrow">Why Appzet Web Solution</p>
            <h2 id="why-heading" className="wm-h2">
              Get a professional website without the hassle
            </h2>
          </Reveal>
          <div className="wm-grid wm-grid-4">
            {benefits.map(([icon, title, text]) => (
              <div className="wm-feature" key={title}>
                <span className="wm-icon-tile purple">
                  <Icon name={icon} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wm-section wm-section-alt" id="pricing" aria-labelledby="pricing-heading">
        <div className="wm-container">
          <Reveal className="wm-section-head">
            <p className="wm-eyebrow">Pricing</p>
            <h2 id="pricing-heading" className="wm-h2">
              Simple, affordable monthly pricing
            </h2>
            <p className="wm-lead">Start free and upgrade when your business is ready.</p>
          </Reveal>

          <div className="wm-pricing-grid">
            {pricingPlans.map((plan) => (
              <article className={`wm-card wm-price ${plan.featured ? "featured" : ""}`} key={plan.name}>
                <span className={`wm-badge ${plan.featured ? "wm-badge-blue" : ""}`}>{plan.tag}</span>
                <h3>{plan.name}</h3>
                <p className="wm-price-amount">
                  ₹{plan.price}
                  <small> /month</small>
                </p>
                <p>{plan.details}</p>
                {plan.name === "Free" ? (
                  <a className="wm-btn wm-btn-primary" href="/templates">
                    Start Free
                  </a>
                ) : (
                  <a className="wm-btn wm-btn-secondary" href={whatsappLink}>
                    Talk on WhatsApp
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="wm-table-wrap" tabIndex={0} role="region" aria-label="Plan comparison table">
            <table className="wm-compare">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Free</th>
                  <th scope="col">₹249 Launch</th>
                  <th scope="col">₹499 Growth</th>
                  <th scope="col">₹999 Business</th>
                </tr>
              </thead>
              <tbody>
                {pricingTableRows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    {row.slice(1).map((cell, index) => (
                      <td key={index}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="wm-section" id="faq" aria-labelledby="faq-heading">
        <div className="wm-container">
          <Reveal className="wm-section-head">
            <p className="wm-eyebrow">FAQ</p>
            <h2 id="faq-heading" className="wm-h2">
              Common questions
            </h2>
          </Reveal>
          <div className="wm-faq">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="wm-section" style={{ paddingTop: 0 }} aria-labelledby="cta-heading">
        <div className="wm-container">
          <div className="wm-cta">
            <h2 id="cta-heading">Ready to Take Your Business Online?</h2>
            <p>Tell us about your business and we&apos;ll help you choose the right website.</p>
            <div className="wm-cta-actions">
              <a className="wm-btn wm-btn-primary wm-btn-lg" href="/templates">
                Get Started
              </a>
              <a className="wm-btn wm-btn-secondary wm-btn-lg" href="/templates">
                Explore Templates
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
);

export default Home;
