import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const Facilities = ({ academy }) => {
  return (
    <section id="facilities" className="bg-white px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          Our facilities
        </p>
        <h2 className="mt-4 max-w-xl text-3xl font-extrabold text-dark sm:text-4xl">
          Built for serious training
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {academy.facilities.map(([icon, title, text]) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-200/60"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-2xl">
                {icon}
              </div>
              <h3 className="mt-4 font-bold text-dark">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Facilities;
