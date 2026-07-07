import { motion } from "framer-motion";

const Unavailable = ({ clientName, initials, pageState, statusError }) => {
  return (
    <div className="font-poppins flex min-h-screen items-center justify-center bg-dark px-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md"
      >
        <span className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-gold font-extrabold text-dark">
          {initials}
        </span>
        <h1 className="text-2xl font-bold text-white">{clientName}</h1>
        <p className="mt-4 text-slate-300">
          {pageState === "paused"
            ? "This site is temporarily unavailable. Please check back soon."
            : "This client site could not be found."}
        </p>
        {statusError ? <p className="mt-2 text-sm text-slate-500">{statusError}</p> : null}
      </motion.div>
    </div>
  );
};

export default Unavailable;
