import { motion } from "framer-motion";

const Unavailable = ({ clientName, logo, pageState, statusError }) => {
  return (
    <div className="font-poppins flex min-h-screen items-center justify-center bg-dark px-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md"
      >
        <img
          src={logo}
          alt={clientName}
          className="mx-auto mb-6 h-16 w-16 rounded-full object-cover"
        />
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
