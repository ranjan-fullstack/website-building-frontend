import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import "../styles/Template.css";
import "../styles/TrackOrder.css";

const academy = {
  name: "Cricket Academy",
  initials: "CA",
  tagline: "Professional cricket coaching for every age group",
  hero: "Build your game with structured cricket coaching",
  subtext:
    "Cricket Academy trains beginners, school-level players, and serious competitors with proper technique, match practice, and personal attention.",
  coachBio:
    "Led by a state-level coach with over 12 years of playing and coaching experience, Cricket Academy focuses on batting technique, bowling action, fielding drills, and match awareness for every batch.",
  badges: ["Certified Coach", "All Age Groups", "Since 2018", "Trial Session Available"],
  programs: [
    [
      "Beginners Batch",
      "Basics of batting, bowling, and fielding for ages 8-12, focused on fun and fundamentals.",
    ],
    [
      "School Level Batch",
      "Technique and match practice for ages 13-17 preparing for school and district selections.",
    ],
    [
      "Advanced / Competitive Batch",
      "Intensive coaching for serious players targeting club and state-level trials.",
    ],
    [
      "Weekend Batch",
      "Flexible weekend-only sessions for working professionals and college students.",
    ],
  ],
  batchTimings: [
    ["Beginners Batch", "Mon, Wed, Fri - 6:00 AM to 7:30 AM"],
    ["School Level Batch", "Tue, Thu, Sat - 6:00 AM to 8:00 AM"],
    ["Advanced / Competitive Batch", "Daily - 5:30 AM to 8:00 AM"],
    ["Weekend Batch", "Sat, Sun - 7:00 AM to 9:00 AM"],
  ],
  fees: [
    ["Beginners Batch", "3 months", "Rs 3,500"],
    ["School Level Batch", "3 months", "Rs 4,500"],
    ["Advanced / Competitive Batch", "3 months", "Rs 6,000"],
    ["Weekend Batch", "3 months", "Rs 3,000"],
  ],
  phone: "+91 98765 12340",
  address: "Cricket Academy Ground, Near Municipal Stadium, Cuttack, Odisha 753001",
  timings: "Mon - Sun: 5:30 AM - 9:00 AM | Evening batches on request",
};

const emptyInquiry = { name: "", phone: "", message: "" };
const emptyAdmission = { studentName: "", phone: "", age: "", batchPreference: "" };

const getSlugFromHash = (hash) =>
  hash.replace(/^#?\/?/, "").split("/").filter(Boolean)[1] || "";

const scrollToSection = (event, sectionId) => {
  event.preventDefault();
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const ClientSite = ({ hash }) => {
  const slug = getSlugFromHash(hash);
  const [pageState, setPageState] = useState(() => (slug ? "loading" : "not-found"));
  const [clientName, setClientName] = useState(academy.name);
  const [statusError, setStatusError] = useState("");

  const [inquiryDraft, setInquiryDraft] = useState(emptyInquiry);
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState("");

  const [admissionDraft, setAdmissionDraft] = useState(emptyAdmission);
  const [admissionSubmitting, setAdmissionSubmitting] = useState(false);
  const [admissionSuccess, setAdmissionSuccess] = useState(false);
  const [admissionError, setAdmissionError] = useState("");

  useEffect(() => {
    if (!slug) {
      return;
    }

    apiRequest(`/public/${slug}`)
      .then((data) => {
        setClientName(data.name || academy.name);
        setPageState(data.status === "active" ? "active" : "paused");
      })
      .catch((error) => {
        setStatusError(error.message);
        setPageState("not-found");
      });
  }, [slug]);

  const submitInquiry = async (event) => {
    event.preventDefault();
    setInquirySubmitting(true);
    setInquiryError("");
    setInquirySuccess(false);

    try {
      await apiRequest(`/public/${slug}/submissions`, {
        method: "POST",
        body: JSON.stringify({ type: "inquiry", ...inquiryDraft }),
      });
      setInquiryDraft(emptyInquiry);
      setInquirySuccess(true);
    } catch (error) {
      setInquiryError(error.message);
    } finally {
      setInquirySubmitting(false);
    }
  };

  const submitAdmission = async (event) => {
    event.preventDefault();
    setAdmissionSubmitting(true);
    setAdmissionError("");
    setAdmissionSuccess(false);

    try {
      await apiRequest(`/public/${slug}/submissions`, {
        method: "POST",
        body: JSON.stringify({ type: "admission", ...admissionDraft }),
      });
      setAdmissionDraft(emptyAdmission);
      setAdmissionSuccess(true);
    } catch (error) {
      setAdmissionError(error.message);
    } finally {
      setAdmissionSubmitting(false);
    }
  };

  if (pageState === "loading") {
    return (
      <main className="track-page">
        <section className="track-shell">
          <p className="track-loading">Loading...</p>
        </section>
      </main>
    );
  }

  if (pageState === "paused" || pageState === "not-found") {
    return (
      <main className="track-page">
        <section className="track-shell">
          <header className="track-header">
            <span className="track-brand">
              <span>{academy.initials}</span>
              <strong>{clientName}</strong>
            </span>
          </header>

          <div className="track-error">
            <p>
              {pageState === "paused"
                ? "This site is temporarily unavailable. Please check back soon."
                : "This client site could not be found."}
            </p>
            {statusError ? <strong>{statusError}</strong> : null}
          </div>
        </section>
      </main>
    );
  }

  return (
    <div
      className="template-page business-template"
      style={{
        "--template-accent": "#16a34a",
        "--template-ink": "#102033",
        "--template-soft": "#dcfce7",
      }}
    >
      <header className="template-header">
        <a
          className="template-brand"
          href="#home"
          onClick={(event) => scrollToSection(event, "home")}
        >
          <span className="template-brand-mark">{academy.initials}</span>
          <span>
            <strong>{clientName}</strong>
            <small>{academy.tagline}</small>
          </span>
        </a>

        <nav className="template-nav">
          <a href="#programs" onClick={(event) => scrollToSection(event, "programs")}>
            Programs
          </a>
          <a href="#fees" onClick={(event) => scrollToSection(event, "fees")}>
            Fees
          </a>
          <a href="#admission" onClick={(event) => scrollToSection(event, "admission")}>
            Admission
          </a>
          <a href="#contact" onClick={(event) => scrollToSection(event, "contact")}>
            Contact
          </a>
        </nav>

        <div className="template-header-actions">
          <a className="template-call-pill" href={`tel:${academy.phone.replace(/\s/g, "")}`}>
            Call Now
          </a>
        </div>
      </header>

      <main>
        <section className="business-hero" id="home">
          <div className="business-hero-copy">
            <p className="template-kicker">Cricket coaching</p>
            <h1>{academy.hero}</h1>
            <p>{academy.subtext}</p>
            <p>{academy.coachBio}</p>

            <div className="trust-badge-row">
              {academy.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="template-section" id="programs">
          <p className="template-kicker">Programs</p>
          <h2>Batches designed for every skill level</h2>
          <div className="service-grid">
            {academy.programs.map(([title, text]) => {
              const timing = academy.batchTimings.find(([batch]) => batch === title);

              return (
                <article className="service-card" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  {timing ? <p>{timing[1]}</p> : null}
                </article>
              );
            })}
          </div>
        </section>

        <section className="template-section" id="fees">
          <p className="template-kicker">Fees</p>
          <h2>Simple, transparent batch fees</h2>
          <div className="service-grid">
            {academy.fees.map(([program, duration, fee]) => (
              <article className="service-card" key={program}>
                <h3>{program}</h3>
                <p>
                  <strong>Duration:</strong> {duration}
                </p>
                <p>
                  <strong>Fee:</strong> {fee}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="template-section" id="inquiry">
          <p className="template-kicker">Quick enquiry</p>
          <h2>Ask about batches, fees, or trial sessions</h2>

          <div className="template-contact-form-card">
            <h3>Send an enquiry</h3>

            {inquirySuccess ? (
              <p className="template-choice-error">
                Thank you! Your enquiry has been received.
              </p>
            ) : null}
            {inquiryError ? <p className="template-choice-error">{inquiryError}</p> : null}

            <form className="template-contact-form" onSubmit={submitInquiry}>
              <label>
                Your name
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={inquiryDraft.name}
                  onChange={(event) =>
                    setInquiryDraft((draft) => ({ ...draft, name: event.target.value }))
                  }
                />
              </label>
              <label>
                Phone number
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={inquiryDraft.phone}
                  onChange={(event) =>
                    setInquiryDraft((draft) => ({ ...draft, phone: event.target.value }))
                  }
                />
              </label>
              <label>
                Message
                <textarea
                  rows="4"
                  placeholder="Write your message here"
                  value={inquiryDraft.message}
                  onChange={(event) =>
                    setInquiryDraft((draft) => ({ ...draft, message: event.target.value }))
                  }
                ></textarea>
              </label>
              <button
                className="template-btn template-btn-dark"
                disabled={inquirySubmitting}
                type="submit"
              >
                {inquirySubmitting ? "Sending..." : "Submit enquiry"}
              </button>
            </form>
          </div>
        </section>

        <section className="template-section" id="admission">
          <p className="template-kicker">Admission</p>
          <h2>Apply for a batch</h2>

          <div className="template-contact-form-card">
            <h3>Admission form</h3>

            {admissionSuccess ? (
              <p className="template-choice-error">
                Thank you! Your admission request has been received.
              </p>
            ) : null}
            {admissionError ? (
              <p className="template-choice-error">{admissionError}</p>
            ) : null}

            <form className="template-contact-form" onSubmit={submitAdmission}>
              <label>
                Student name
                <input
                  type="text"
                  placeholder="Enter student name"
                  value={admissionDraft.studentName}
                  onChange={(event) =>
                    setAdmissionDraft((draft) => ({
                      ...draft,
                      studentName: event.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Phone number
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={admissionDraft.phone}
                  onChange={(event) =>
                    setAdmissionDraft((draft) => ({ ...draft, phone: event.target.value }))
                  }
                />
              </label>
              <label>
                Student age
                <input
                  type="number"
                  min="5"
                  max="60"
                  placeholder="Age"
                  value={admissionDraft.age}
                  onChange={(event) =>
                    setAdmissionDraft((draft) => ({ ...draft, age: event.target.value }))
                  }
                />
              </label>
              <label>
                Batch preference
                <select
                  value={admissionDraft.batchPreference}
                  onChange={(event) =>
                    setAdmissionDraft((draft) => ({
                      ...draft,
                      batchPreference: event.target.value,
                    }))
                  }
                >
                  <option value="" disabled>
                    Select a batch
                  </option>
                  {academy.programs.map(([title]) => (
                    <option value={title} key={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="template-btn template-btn-dark"
                disabled={admissionSubmitting}
                type="submit"
              >
                {admissionSubmitting ? "Sending..." : "Submit admission request"}
              </button>
            </form>
          </div>
        </section>

        <section className="template-section contact-section" id="contact">
          <div className="contact-copy">
            <p className="template-kicker">Contact</p>
            <h2>Visit or call before your trial session</h2>

            <div className="contact-details">
              <p>
                <strong>Phone:</strong> {academy.phone}
              </p>
              <p>
                <strong>Address:</strong> {academy.address}
              </p>
              <p>
                <strong>Timings:</strong> {academy.timings}
              </p>
            </div>

            <div className="template-actions">
              <a
                className="template-btn template-btn-dark"
                href={`tel:${academy.phone.replace(/\s/g, "")}`}
              >
                Call Now
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="template-footer">
        <div className="template-footer-brand">
          <span className="template-brand-mark">{academy.initials}</span>
          <div>
            <strong>{clientName}</strong>
            <p>{academy.tagline}</p>
          </div>
        </div>

        <div className="template-footer-links">
          <h3>Quick links</h3>
          <a href="#programs" onClick={(event) => scrollToSection(event, "programs")}>
            Programs
          </a>
          <a href="#fees" onClick={(event) => scrollToSection(event, "fees")}>
            Fees
          </a>
          <a href="#contact" onClick={(event) => scrollToSection(event, "contact")}>
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ClientSite;
