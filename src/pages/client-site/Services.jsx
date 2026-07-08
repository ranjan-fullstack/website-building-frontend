import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const Services = ({ academy }) => {
  return (
    <section id="services" className="bg-slate-50 px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          Our services
        </p>
        <h2 className="mt-4 max-w-xl text-3xl font-extrabold text-dark sm:text-4xl">
          Everything your school needs for a complete cricket program
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {academy.services.map(([icon, title]) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-md shadow-slate-200/60"
            >
              <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-primary/10 text-2xl">
                {icon}
              </span>
              <h3 className="font-bold text-dark">{title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
