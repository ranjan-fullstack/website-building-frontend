import { motion } from "framer-motion";

const SuccessConfirmation = ({ message, onReset, title = "Request received!" }) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 py-10 text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="grid h-16 w-16 place-items-center rounded-full bg-primary text-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
      >
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M4 12.5l5 5L20 6.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      <div>
        <h3 className="font-poppins text-xl font-bold text-dark">{title}</h3>
        <p className="mt-2 max-w-sm text-slate-600">{message}</p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="font-poppins text-sm font-semibold text-primary underline underline-offset-4"
      >
        Submit another
      </button>
    </motion.div>
  );
};

export default SuccessConfirmation;
