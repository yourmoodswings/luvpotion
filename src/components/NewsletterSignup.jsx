import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const NewsletterSignup = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`${
        isDark ? "bg-[#111111] text-[#FFFFFF]" : "bg-[#fdfdf9] text-[#111111]"
      } font-sans px-6 md:px-16 py-24 transition-colors duration-500`}
    >
      <div className="max-w-3xl mx-auto text-center">

        {/* Headline */}
        <motion.h2
          className="text-[2rem] md:text-[2.8rem] font-bold uppercase tracking-widest leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Be First to Sip from the Drop
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className={`mt-4 text-base md:text-lg ${
            isDark ? "text-neutral-400" : "text-neutral-700"
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Join our inner circle for early access to new collections, AR reveals, and cultural drops.
        </motion.p>

        {/* Form */}
        <motion.form
          className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className={`px-4 py-3 w-full md:w-2/3 rounded-full border text-sm tracking-wide transition-colors ${
              isDark
                ? "bg-black border-neutral-700 text-[#FBEEC1] placeholder:text-[#FBEEC1]"
                : "bg-white border-neutral-300 text-black placeholder:text-neutral-600"
            }`}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full font-semibold tracking-wide bg-neutral-900 text-[#FBEEC1] hover:bg-black transition"
          >
            Get the Potion →
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
