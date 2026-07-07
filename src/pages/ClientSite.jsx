import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import "../styles/clientSiteTailwind.css";
import { academy } from "./client-site/academyContent";
import AcademyDetails from "./client-site/AcademyDetails";
import AdmissionForm from "./client-site/AdmissionForm";
import Footer from "./client-site/Footer";
import Hero from "./client-site/Hero";
import InquiryContact from "./client-site/InquiryContact";
import ProgramsFees from "./client-site/ProgramsFees";
import SiteNav from "./client-site/SiteNav";
import Unavailable from "./client-site/Unavailable";

const emptyInquiry = { name: "", phone: "", message: "" };
const emptyAdmission = { studentName: "", phone: "", age: "", batchPreference: "" };

const getSlugFromHash = (hash) =>
  hash.replace(/^#?\/?/, "").split("/").filter(Boolean)[1] || "";

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

  const updateInquiryDraft = (field, value) => {
    setInquiryDraft((draft) => ({ ...draft, [field]: value }));
  };

  const updateAdmissionDraft = (field, value) => {
    setAdmissionDraft((draft) => ({ ...draft, [field]: value }));
  };

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
      <div className="font-poppins grid min-h-screen place-items-center bg-dark">
        <svg className="animate-spin text-gold" width="36" height="36" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (pageState === "paused" || pageState === "not-found") {
    return (
      <Unavailable
        clientName={clientName}
        initials={academy.initials}
        pageState={pageState}
        statusError={statusError}
      />
    );
  }

  return (
    <div className="font-poppins bg-white">
      <SiteNav clientName={clientName} initials={academy.initials} phone={academy.phone} slug={slug} />
      <Hero academy={academy} />
      <AcademyDetails academy={academy} />
      <ProgramsFees academy={academy} />
      <AdmissionForm
        academy={academy}
        draft={admissionDraft}
        onChange={updateAdmissionDraft}
        onSubmit={submitAdmission}
        submitting={admissionSubmitting}
        success={admissionSuccess}
        error={admissionError}
        onReset={() => setAdmissionSuccess(false)}
      />
      <InquiryContact
        academy={academy}
        draft={inquiryDraft}
        onChange={updateInquiryDraft}
        onSubmit={submitInquiry}
        submitting={inquirySubmitting}
        success={inquirySuccess}
        error={inquiryError}
        onReset={() => setInquirySuccess(false)}
      />
      <Footer clientName={clientName} initials={academy.initials} />
    </div>
  );
};

export default ClientSite;
