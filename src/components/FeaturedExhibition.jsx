import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const FeaturedExhibition = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const lines = [
    "HEADS OF STATE",
    "A SATIRICAL DYNASTY",
    "OF POWER AND METAL",
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <section
      className={`${
        isDark ? "bg-[#111111] text-[#FFFFFF]" : "bg-[#fdfdf9] text-[#111111]"
      } font-sans py-24 px-6 md:px-16 transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {lines.map((line, index) => (
            <motion.h1
              key={index}
              className="text-[2.2rem] md:text-[3.2rem] font-bold uppercase tracking-widest leading-tight"
              variants={lineVariants}
            >
              {line}
            </motion.h1>
          ))}

          <motion.p
            className="mt-6 text-base md:text-lg max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            From Tafawa Balewa to Jagaban — a medallion series chronicling Nigeria’s power lineage through myth, memory, and satire.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/exhibitions/heads-of-state">
              <button className="px-6 py-3 rounded-full border border-[#FBEEC1] text-[#FBEEC1] hover:bg-[#FBEEC1] hover:text-black transition font-semibold">
                Explore the Timeline →
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/assets/heads-of-state-preview.jpg"
            alt="Heads of State Medallion"
            className="rounded-xl border shadow-lg w-full object-cover max-h-[500px] border-neutral-300 dark:border-neutral-800"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedExhibition;
