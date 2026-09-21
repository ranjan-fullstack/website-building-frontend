import "../styles/ui.css";
import "../styles/Marketing.css";
import "../styles/TrustPage.css";
import { contact } from "../data/site";
import SiteFooter from "../components/ui/SiteFooter";
import SiteHeader from "../components/ui/SiteHeader";

const whatsappLink =
  "https://wa.me/919692428905?text=Hi%20Appzet%20Web%20Solution%2C%20I%20need%20help%20with%20my%20website.";

const pageContent = {
  services: {
    kicker: "Appzet Web Solution Services",
    title: "Website services for local business growth",
    intro:
      "Appzet Web Solution provides practical website setup, template customization, WhatsApp enquiry flows, basic SEO, and support for Indian small businesses.",
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
          "Customers can request changes, track project progress, and contact Appzet Web Solution support through official phone, email, and WhatsApp channels.",
      },
    ],
  },
  about: {
    kicker: "About Appzet Web Solution",
    title: "Affordable websites for Indian local businesses",
    intro:
      "Appzet Web Solution helps small businesses, shops, clinics, gyms, coaching centres, and service providers create credible websites without needing to manage the technical work themselves.",
    sections: [
      {
        title: "What we do",
        text:
          "We provide website templates, done-for-you setup support, WhatsApp enquiry flows, basic SEO guidance, and ongoing updates for business owners who want a practical online presence.",
      },
      {
        title: "How accounts work",
        text:
          "Customers can create an account with their email address and a password to track website projects and support requests. Passwords are stored only in hashed form and are never visible to our team.",
      },
    ],
  },
  contact: {
    kicker: "Contact Appzet Web Solution",
    title: "Reach the Appzet Web Solution team",
    intro:
      "Use these official contact details for website setup, support, billing questions, or account help.",
    sections: [
      {
        title: "Phone and WhatsApp",
        text: contact.phone,
        href: contact.phoneHref,
      },
      {
        title: "Email",
        text: contact.email,
        href: contact.emailHref,
      },
      {
        title: "Office address",
        text: contact.address,
      },
      {
        title: "Working hours",
        text: contact.hours,
      },
    ],
  },
  privacy: {
    kicker: "Privacy Policy",
    title: "How Appzet Web Solution handles account and enquiry data",
    intro:
      "This policy explains the information Appzet Web Solution uses to provide website services and customer support.",
    sections: [
      {
        title: "Information we collect",
        text:
          "When you create an account, Appzet Web Solution collects your name and email address, and a password that is stored only as a secure hash. We may also collect business details you share for website setup and enquiries.",
      },
      {
        title: "Passwords and credentials",
        text:
          "Your password is never stored in readable form and never logged. Please choose a strong, unique password and do not share it with anyone, including our team.",
      },
      {
        title: "How we use information",
        text:
          "We use account and business information to create websites, manage project status, respond to support requests, and contact you about your Appzet Web Solution service.",
      },
      {
        title: "Data sharing",
        text:
          "We do not sell customer data. We share information only with service providers needed to operate the website, process support, or comply with legal obligations.",
      },
      {
        title: "Contact for privacy requests",
        text:
          "For access, correction, or deletion requests, email " + contact.email + " or contact Appzet Web Solution on WhatsApp.",
      },
    ],
  },
  terms: {
    kicker: "Terms and Conditions",
    title: "Terms for using Appzet Web Solution services",
    intro:
      "These terms explain the basic conditions for using Appzet Web Solution's website, templates, account features, and support services.",
    sections: [
      {
        title: "Use of services",
        text:
          "Appzet Web Solution services are intended for legitimate business website creation, project tracking, enquiries, and customer support.",
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
          "Appzet Web Solution accounts are protected by email and password sign-in. We will never ask you to share your password by message, email or phone.",
      },
    ],
  },
};

const TrustPage = ({ type = "about" }) => {
  const content = pageContent[type] || pageContent.about;

  return (
    <div className="wm-page">
      <SiteHeader />

      <main id="main-content" className="trust-main wm-container">
        <section className="trust-hero">
          <p className="wm-eyebrow">{content.kicker}</p>
          <h1 className="wm-h1">{content.title}</h1>
          <p className="wm-lead">{content.intro}</p>
        </section>

        <section className="trust-content" aria-label={content.title}>
          {content.sections.map((section) => (
            <article className="wm-card trust-info-card" key={section.title}>
              <h2>{section.title}</h2>
              {section.href ? <a href={section.href}>{section.text}</a> : <p>{section.text}</p>}
            </article>
          ))}
        </section>

        <section className="wm-cta trust-cta">
          <h2>Need help with your website?</h2>
          <p>Talk to Appzet Web Solution support on WhatsApp, phone or email.</p>
          <div className="wm-cta-actions">
            <a className="wm-btn wm-btn-whatsapp wm-btn-lg" href={whatsappLink}>
              Contact on WhatsApp
            </a>
            <a className="wm-btn wm-btn-secondary wm-btn-lg" href="/templates">
              Explore Templates
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default TrustPage;
