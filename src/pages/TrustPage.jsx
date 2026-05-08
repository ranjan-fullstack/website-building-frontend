import "../styles/TrustPage.css";

const whatsappLink =
  "https://wa.me/917995590740?text=Hi%20WebMitra%2C%20I%20need%20help%20with%20my%20website.";

const pageContent = {
  services: {
    kicker: "WebMitra Services",
    title: "Website services for local business growth",
    intro:
      "WebMitra provides practical website setup, template customization, WhatsApp enquiry flows, basic SEO, and support for Indian small businesses.",
    sections: [
      {
        title: "Website setup",
        text:
          "We help businesses choose a layout, organize content, add contact details, and prepare a professional website for launch.",
      },
      {
        title: "SEO and trust basics",
        text:
          "We add important search basics such as page metadata, favicon support, sitemap, robots.txt, business contact details, and privacy information.",
      },
      {
        title: "Support and updates",
        text:
          "Customers can request changes, track project progress, and contact WebMitra support through official phone, email, and WhatsApp channels.",
      },
    ],
  },
  about: {
    kicker: "About WebMitra",
    title: "Affordable websites for Indian local businesses",
    intro:
      "WebMitra helps small businesses, shops, clinics, gyms, coaching centres, and service providers create credible websites without needing to manage the technical work themselves.",
    sections: [
      {
        title: "What we do",
        text:
          "We provide website templates, done-for-you setup support, WhatsApp enquiry flows, basic SEO guidance, and ongoing updates for business owners who want a practical online presence.",
      },
      {
        title: "How accounts work",
        text:
          "Customers can sign in with the official Google Sign-In button to track website projects and support requests. WebMitra never asks for or stores Google passwords.",
      },
    ],
  },
  contact: {
    kicker: "Contact WebMitra",
    title: "Reach the WebMitra team",
    intro:
      "Use these official contact details for website setup, support, billing questions, or account help.",
    sections: [
      {
        title: "Phone and WhatsApp",
        text: "+91 7995590740",
        href: "tel:+917995590740",
      },
      {
        title: "Email",
        text: "rksahu4455@gmail.com",
        href: "mailto:rksahu4455@gmail.com",
      },
      {
        title: "Office address",
        text:
          "No.305, Block-B, Deccan Prakruti Apartment, Egattur, Chennai, Tamil Nadu 600130",
      },
    ],
  },
  privacy: {
    kicker: "Privacy Policy",
    title: "How WebMitra handles account and enquiry data",
    intro:
      "This policy explains the information WebMitra uses to provide website services and customer support.",
    sections: [
      {
        title: "Information we collect",
        text:
          "When you sign in with Google, WebMitra receives your verified name, email address, and profile image from Google. We may also collect business details you share for website setup and enquiries.",
      },
      {
        title: "Passwords and credentials",
        text:
          "WebMitra does not collect, see, store, or log your Google password. Authentication is handled through Google's official sign-in service.",
      },
      {
        title: "How we use information",
        text:
          "We use account and business information to create websites, manage project status, respond to support requests, and contact you about your WebMitra service.",
      },
      {
        title: "Data sharing",
        text:
          "We do not sell customer data. We share information only with service providers needed to operate the website, process support, or comply with legal obligations.",
      },
      {
        title: "Contact for privacy requests",
        text:
          "For access, correction, or deletion requests, email rksahu4455@gmail.com or contact WebMitra on WhatsApp.",
      },
    ],
  },
  terms: {
    kicker: "Terms and Conditions",
    title: "Terms for using WebMitra services",
    intro:
      "These terms explain the basic conditions for using WebMitra's website, templates, account features, and support services.",
    sections: [
      {
        title: "Use of services",
        text:
          "WebMitra services are intended for legitimate business website creation, project tracking, enquiries, and customer support.",
      },
      {
        title: "Customer responsibilities",
        text:
          "Customers should provide accurate business information, own or have permission to use submitted content, and avoid sharing sensitive credentials through forms or messages.",
      },
      {
        title: "Payments and delivery",
        text:
          "Project scope, pricing, delivery timelines, and support details are confirmed with the customer before paid work begins.",
      },
      {
        title: "Account security",
        text:
          "WebMitra uses Google Sign-In for account access and never asks users to enter Google passwords on WebMitra pages.",
      },
    ],
  },
};

const TrustPage = ({ type = "about" }) => {
  const content = pageContent[type] || pageContent.about;

  return (
    <div className="trust-page">
      <header className="trust-header">
        <a className="brand-mark" href="/">
          <div className="brand-badge">WM</div>
          <div>
            <p className="brand-name">WebMitra</p>
            <span className="brand-subtitle">Websites for growing local businesses</span>
          </div>
        </a>
        <nav className="trust-nav" aria-label="Company pages">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/services">Services</a>
          <a href="/privacy-policy">Privacy</a>
          <a href="/terms-and-conditions">Terms</a>
          <a href="/login">Sign in</a>
        </nav>
      </header>

      <main className="trust-main">
        <section className="trust-hero">
          <p className="section-kicker">{content.kicker}</p>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
        </section>

        <section className="trust-content" aria-label={content.title}>
          {content.sections.map((section) => (
            <article className="trust-info-card" key={section.title}>
              <h2>{section.title}</h2>
              {section.href ? <a href={section.href}>{section.text}</a> : <p>{section.text}</p>}
            </article>
          ))}
        </section>

        <section className="trust-contact-strip">
          <div>
            <p className="section-kicker">Need help?</p>
            <h2>Talk to WebMitra support</h2>
          </div>
          <a className="btn btn-primary" href={whatsappLink}>
            Contact on WhatsApp
          </a>
        </section>
      </main>
    </div>
  );
};

export default TrustPage;
