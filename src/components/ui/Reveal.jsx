import { motion, useReducedMotion } from "framer-motion";

// One-shot fade-up when scrolled into view. No-op for users who prefer reduced motion.
const Reveal = ({ as = "div", delay = 0, className, children }) => {
  const reduce = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Component>
  );
};

export default Reveal;
