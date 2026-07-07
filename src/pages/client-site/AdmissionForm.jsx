import { motion } from "framer-motion";
import SuccessConfirmation from "./SuccessConfirmation";

const Spinner = () => (
  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const AdmissionForm = ({ academy, draft, onChange, onSubmit, submitting, success, error, onReset }) => {
  return (
    <section id="admission" className="bg-primary px-5 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="mx-auto w-fit rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
            Admission
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Start Your Cricket Journey
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-dark/90 text-white/80">
            Fill in a few details and our coach will get in touch to confirm your batch and
            trial slot.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-3xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-8"
        >
          {success ? (
            <SuccessConfirmation
              title="Admission request received!"
              message="Our coach will contact you within 24 hours to confirm your batch and trial slot."
              onReset={onReset}
            />
          ) : (
            <form className="grid gap-5" onSubmit={onSubmit}>
              {error ? (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </p>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-dark">
                  Student name
                  <input
                    type="text"
                    placeholder="Enter student name"
                    value={draft.studentName}
                    onChange={(event) => onChange("studentName", event.target.value)}
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
                  Student age
                  <input
                    type="number"
                    min="5"
                    max="60"
                    placeholder="Age"
                    value={draft.age}
                    onChange={(event) => onChange("age", event.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3 font-normal text-dark outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold text-dark">
                  Batch preference
                  <select
                    value={draft.batchPreference}
                    onChange={(event) => onChange("batchPreference", event.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3 font-normal text-dark outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  >
                    <option value="" disabled>
                      Select a batch
                    </option>
                    {academy.programs.map((program) => (
                      <option value={program.title} key={program.title}>
                        {program.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-cta px-6 py-3.5 font-bold text-white shadow-lg shadow-cta/30 transition hover:bg-cta-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Spinner /> Submitting...
                  </>
                ) : (
                  "Submit Admission Request"
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionForm;
