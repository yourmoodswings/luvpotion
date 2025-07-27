import { motion } from "framer-motion";

const ManifestoSection = () => {
  return (

    
    <section className="px-6 md:px-20 py-24 font-serif">
         {/* Section Heading */}
      <motion.h2
        className="text-center text-3xl md:text-5xl tracking-[0.2em] font-semibold mb-12 mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
      LUVPOTION MANISFESTO
      </motion.h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Left Column */}
        <div className="space-y-6 text-sm md:text-base leading-relaxed">
          <p>
          From independence to military rule, democracy to dictatorship, Nigeria’s history is a landscape of power shifts, silent battles, and public reckonings.

LUVPOTION transforms these complicated legacies into collectible objects — archiving the faces, events, and eras that shaped our state. Our work is not to choose sides, but to keep the record intact, unfiltered, and accessible for generations to come.

Each drop distills fragments of leadership, conflict, and evolution into physical forms that challenge how we interact with the past.
          </p>
          <p>
          is not a judgment. It is preservation. We archive Nigeria’s story through art, wearable collectibles, and cultural memory. Every leader. Every era. Every decision. All part of the same evolving history.
          </p>
        </div>

        {/* Image */}
        <div className="mx-auto">
          <img
            src="/assets/museum.jpg" // Make sure this exists in /public/assets
            alt="Museum interior"
            className="rounded-md w-full object-cover max-h-[600px]"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6 text-sm md:text-base leading-relaxed">
          <p>
          These pieces are not political endorsements.
They are cultural documentation.

Our pendants, sculptures, and emblems are limited by design — sculpted in precious metal, numbered for rarity, and delivered with historical context.

In preserving uncomfortable history, we protect national memory from erasure. To forget is easy. To remember honestly requires courage.

With every drop, LUVPOTION expands the national archive — one artifact at a time.
          </p>
          <div>
            <button className="mt-4 border border-[#FBEEC1] px-6 py-2 text-sm hover:bg-[#FBEEC1] hover:text-black transition">
              View more
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ManifestoSection;
