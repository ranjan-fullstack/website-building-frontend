import { motion } from "framer-motion";
import SuccessConfirmation from "./SuccessConfirmation";
import { telHref, whatsappHref } from "./utils";

const Spinner = () => (
  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const InquiryContact = ({ academy, draft, onChange, onSubmit, submitting, success, error, onReset }) => {
  return (
    <section id="contact" className="bg-dark px-5 py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-8 text-white"
        >
          <p className="w-fit rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Visit or call before your trial session
          </h2>

          <div className="mt-8 grid gap-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 flex-none place-items-center rounded-full bg-white/15">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2.1z" />
                </svg>
              </span>
              <div>
                <strong className="block">Phone</strong>
                <a href={telHref(academy.phone)} className="text-white/80 hover:text-white">
                  {academy.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 flex-none place-items-center rounded-full bg-white/15">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.51 2 12.04 2zm5.8 14.08c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.12-.42-.13-.95-.31-1.64-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.15.12.32.02.52-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.15.48.22.55.34.07.13.07.73-.17 1.41z" />
                </svg>
              </span>
              <div>
                <strong className="block">WhatsApp</strong>
                <a
                  href={whatsappHref(academy.whatsapp, `Hi ${academy.name}, I'd like to know more.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white"
                >
                  {academy.whatsapp}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 flex-none place-items-center rounded-full bg-white/15">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v16H4z" />
                  <path d="M4 6l8 7 8-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <strong className="block">Email</strong>
                <a href={`mailto:${academy.email}`} className="text-white/80 hover:text-white">
                  {academy.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 flex-none place-items-center rounded-full bg-white/15">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 21s7-6.1 7-11a7 7 0 0 0-14 0c0 4.9 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <div>
                <strong className="block">Address</strong>
                <span className="text-white/80">{academy.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 flex-none place-items-center rounded-full bg-white/15">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" strokeLinecap="round" />
                </svg>
              </span>
              <div>
                <strong className="block">Timings</strong>
                <span className="text-white/80">{academy.timings}</span>
              </div>
            </div>
          </div>

          <a
            href={telHref(academy.phone)}
            className="mt-8 inline-flex rounded-full bg-cta px-6 py-3 font-bold text-white shadow-lg shadow-cta/30 hover:bg-cta-dark"
          >
            Call Now
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl bg-white p-8"
        >
          {success ? (
            <SuccessConfirmation
              title="Thank you!"
              message="Your enquiry has been received. Our team will reach out shortly."
              onReset={onReset}
            />
          ) : (
            <>
              <h3 className="text-xl font-bold text-dark">Send a quick enquiry</h3>
              <p className="mt-1 text-sm text-slate-600">
                Ask about batches, fees, or trial sessions.
              </p>

              <form className="mt-6 grid gap-5" onSubmit={onSubmit}>
                {error ? (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {error}
                  </p>
                ) : null}

                <label className="grid gap-2 text-sm font-semibold text-dark">
                  Your name
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={draft.name}
                    onChange={(event) => onChange("name", event.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3 font-normal text-dark outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold text-dark">
                  Phone number
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={draft.phone}
                    onChange={(event) => onChange("phone", event.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3 font-normal text-dark outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold text-dark">
                  Message
                  <textarea
                    rows="4"
                    placeholder="Write your message here"
                    value={draft.message}
                    onChange={(event) => onChange("message", event.target.value)}
                    className="resize-y rounded-xl border border-slate-200 px-4 py-3 font-normal text-dark outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  ></textarea>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 rounded-full bg-cta px-6 py-3.5 font-bold text-white shadow-lg shadow-cta/30 transition hover:bg-cta-dark disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Spinner /> Sending...
                    </>
                  ) : (
                    "Submit Enquiry"
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default InquiryContact;
