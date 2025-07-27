import { motion } from "framer-motion";

const NewsletterSignup = () => {
  return (
    <section className="font-serif px-6 md:px-12 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Be First to Sip from the Next Drop.
        </motion.h2>
        <p className="text-neutral-600 mt-4 text-base">
          Join our inner circle for early exhibitions, digital drops, and secret AR content.
        </p>

        <form className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="px-4 py-3 w-full md:w-2/3 rounded-full bg-black border border-neutral-700 text-white placeholder:text-[#FBEEC1]"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-neutral-900 text-[#FBEEC1] font-semibold rounded-full hover:bg-black transition"
          >
            Get the Potion
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
