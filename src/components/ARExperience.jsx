import { motion } from "framer-motion";

const ARExperience = () => {
  return (
    <section className="font-serif px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Mock AR Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-xl overflow-hidden border border-neutral-800 shadow-lg"
        >
          <img
            src="https://via.placeholder.com/600x400/111111/ffffff?text=AR+Preview+Coming+Soon"
            alt="AR Smart Label Preview"
            className="w-full object-cover"
          />
        </motion.div>

        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Scan. Tap. <span className="">Reveal the Unseen.</span>
          </h2>
          <p className="mt-4 text-lg">
            Our pieces don’t just sit still — they whisper. Each medallion, shirt, or vase comes alive through LUVPOTION’s smart labels and AR reveals.
          </p>
          <p className="mt-2 text-sm italic">
            Powered by emotion. Activated by you.
          </p>
          <button className="mt-6 px-6 py-3 bg-neutral-800 text-[#FBEEC1] font-semibold rounded-full hover:bg-black transition">
            Experience the Future
          </button>
        </div>
      </div>
    </section>
  );
};

export default ARExperience;
