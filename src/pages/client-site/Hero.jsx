import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToSection } from "./utils";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1674986778924-7a33c1531443?q=75&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599982946086-eb42d9e14eb8?q=75&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565787154274-c8d076ad34e7?q=75&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1730739463889-34c7279277a9?q=75&w=1600&auto=format&fit=crop",
];

const SLIDE_INTERVAL_MS = 4500;

const Hero = ({ academy }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-dark px-5 pt-28 pb-20"
    >
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={activeSlide}
            src={HERO_IMAGES[activeSlide]}
            alt=""
            loading={activeSlide === 0 ? "eager" : "lazy"}
            fetchPriority={activeSlide === 0 ? "high" : "auto"}
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-linear-to-r from-dark/95 via-dark/75 to-dark/40" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-dark/70" />
      </div>

      <div
        className="pointer-events-none absolute -top-32 -right-32 z-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #0b6e4f, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-24 z-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #f4b400, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide text-gold"
        >
          {academy.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="max-w-3xl text-4xl leading-[1.05] font-extrabold text-white! sm:text-5xl lg:text-6xl"
        >
          {academy.heroHeadline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="max-w-2xl text-lg text-slate-300"
        >
          {academy.heroSubtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#admission"
            onClick={scrollToSection("admission")}
            className="rounded-full bg-cta px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-cta/30 transition hover:-translate-y-0.5 hover:bg-cta-dark"
          >
            Apply for Admission
          </a>
          <a
            href="#contact"
            onClick={scrollToSection("contact")}
            className="rounded-full border border-white/25 px-7 py-3.5 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            Ask a Question
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="flex flex-wrap gap-3 pt-4"
        >
          {academy.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {HERO_IMAGES.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Show background image ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeSlide ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <motion.a
        href="#about"
        onClick={scrollToSection("about")}
        aria-label="Scroll to learn more"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  );
};

export default Hero;
