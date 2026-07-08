import { motion } from "framer-motion";
import ac1 from "../../assets/ac1.jpeg";
import ac2 from "../../assets/ac2.jpeg";
import ac3 from "../../assets/ac3.jpeg";
import ac4 from "../../assets/ac4.jpeg";

const albumImages = [ac1, ac2, ac3, ac4];

const icons = {
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.2 13.9 7 23l5-3 5 3-1.2-9.1" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" />
    </>
  ),
  activity: (
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  shield: (
    <path
      d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  trending: (
    <>
      <path d="M23 6l-9.5 9.5-5-5L1 18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 6h6v6" strokeLinecap="round" strokeLinejoin="round" />
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
            <p className="mt-4 text-slate-600">{academy.about}</p>
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {albumImages.map((image, index) => (
            <motion.div
              key={image}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="aspect-square overflow-hidden rounded-2xl shadow-md shadow-slate-200/60"
            >
              <img
                src={image}
                alt={`${academy.name} training moment ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16">
          <p className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Why choose us
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-dark sm:text-4xl">
            Why Choose RiseX?
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
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
