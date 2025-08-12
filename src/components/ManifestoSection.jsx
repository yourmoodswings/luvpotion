import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const ManifestoSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const lines = ["LUVPOTION", "MANIFESTO"];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section
      className={`${
        isDark ? "bg-[#111111] text-[#FFFFFF]" : "bg-[#fdfdf9] text-[#111111]"
      } font-sans px-6 md:px-16 py-24 transition-colors duration-500`}
    >
      {/* Heading */}
      <motion.div
        className="text-left md:text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {lines.map((line, index) => (
          <motion.h2
            key={index}
            className="text-[2.4rem] md:text-[4.2rem] font-bold uppercase tracking-widest leading-tight"
            variants={lineVariants}
          >
            {line}
          </motion.h2>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-sm md:text-base leading-relaxed">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p>
            From independence to dictatorship, Nigeria’s history is a shifting terrain of power, silence, and survival.
          </p>
          <p>
            LUVPOTION transforms these legacies into sculpted archives — medallions, prints, and vignettes that preserve the memory of statecraft.
          </p>
          <p>
            Our mission is not to retell the story — but to make its artifacts impossible to forget.
          </p>
        </motion.div>

        {/* Center */}
        <motion.div
          className="mx-auto w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/assets/museum.jpg"
            alt="Museum interior"
            className="rounded-md w-full object-cover max-h-[500px] border border-neutral-300 dark:border-neutral-800 shadow-md"
          />
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p>
            These objects are not political. They are historical residues. Fragile, limited, documented.
          </p>
          <p>
            Each LUVPOTION piece is engraved with the weight of era, material, and memory. We preserve power by forging it into form.
          </p>
          <p>
            With every drop, we expand the living archive — one artifact at a time.
          </p>
          <div>
            <button className="mt-4 border border-[#FBEEC1] px-6 py-2 text-sm rounded-full hover:bg-[#FBEEC1] hover:text-black transition">
              View More →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ManifestoSection;
