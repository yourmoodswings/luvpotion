import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const ARExperience = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const lines = ["SCAN.", "TAP.", "REVEAL THE UNSEEN."];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
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
    <section className={`${isDark ? "bg-[#111111] text-[#FFFFFF]" : "bg-[#fdfdf9] text-[#111111]"} font-sans px-6 md:px-16 py-24`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* AR Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden border shadow-md border-neutral-300 dark:border-neutral-800"
        >
          <img
            src="/assets/ar-reveal.png" // use generated image here
            alt="AR Medallion Scan"
            className="w-full object-cover"
          />
        </motion.div>

        {/* Text Content */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-6"
          >
            {lines.map((line, index) => (
              <motion.h2
                key={index}
                variants={lineVariants}
                className="text-[2rem] md:text-[3.2rem] font-bold uppercase tracking-widest leading-tight"
              >
                {line}
              </motion.h2>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base max-w-xl"
          >
            LUVPOTION objects come alive through smart labels and augmented layers. Each medallion, shirt, or sculpture whispers its story.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm italic text-[#FBEEC1] dark:text-neutral-500"
          >
            Powered by memory. Activated by you.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 px-6 py-3 bg-neutral-900 text-[#FBEEC1] font-semibold rounded-full hover:bg-black transition"
          >
            Experience the Future →
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ARExperience;
