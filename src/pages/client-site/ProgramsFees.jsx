import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const ProgramsFees = ({ academy }) => {
  return (
    <section id="programs-fees" className="bg-slate-50 px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          Programs &amp; fees
        </p>
        <h2 className="mt-4 max-w-xl text-3xl font-extrabold text-dark sm:text-4xl">
          Batches designed for every skill level
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {academy.programs.map((program) => (
            <motion.article
              key={program.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-200/60"
            >
              {program.popular ? (
                <span className="absolute -top-3 right-5 rounded-full bg-gold px-3 py-1 text-xs font-extrabold text-dark shadow">
                  Most Popular
                </span>
              ) : null}

              <h3 className="text-lg font-bold text-dark">{program.title}</h3>
              <p className="mt-1 text-sm font-semibold text-primary">{program.ageGroup}</p>
              <p className="mt-3 flex-1 text-sm text-slate-600">{program.description}</p>
              <p className="mt-4 text-sm text-slate-500">{program.timing}</p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {program.duration}
                </span>
                <span className="rounded-full bg-gold/15 px-3 py-1.5 text-sm font-extrabold text-dark">
                  {program.fee}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsFees;
