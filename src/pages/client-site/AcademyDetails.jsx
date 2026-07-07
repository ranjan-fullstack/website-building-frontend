import { motion } from "framer-motion";

const icons = {
  trophy: (
    <path d="M8 21h8M12 17v4M7 4h10v3a5 5 0 0 1-10 0V4zM7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16 14c2.8.4 5 2.5 5 5.4" />
    </>
  ),
};

const Icon = ({ name }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  >
    {icons[name]}
  </svg>
);

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const AcademyDetails = ({ academy }) => {
  return (
    <section id="about" className="bg-white px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            transition={{ duration: 0.5 }}
          >
            <p className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              About the academy
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-dark sm:text-4xl">
              A coaching program built around real progress
            </h2>
            <p className="mt-4 text-slate-600">{academy.coachBio}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-2 gap-4"
          >
            {academy.stats.map(([value, label]) => (
              <motion.div
                key={label}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-200/60"
              >
                <strong className="block text-3xl font-extrabold text-gold">{value}</strong>
                <span className="mt-1 block text-sm font-semibold text-slate-500">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-16">
          <p className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Why choose us
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-dark sm:text-4xl">
            What makes our coaching different
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {academy.whyChooseUs.map(([icon, title, text]) => (
              <motion.article
                key={title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-200/60"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon name={icon} />
                </div>
                <h3 className="mt-4 font-bold text-dark">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AcademyDetails;
