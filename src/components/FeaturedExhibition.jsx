import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FeaturedExhibition = () => {
  return (
    <section className="relative py-20 px-6 md:px-12 font-serif overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">HEADS OF STATE</h1>
            <h2 className="text-4xl md:text-2xl font-bold leading-tight">
            <br />Introducing The First Dynasty
          </h2>
          <p className="mt-4 text-lg">
            From Tafawa Balewa to Jagaban — explore the medallion series chronicling Nigeria’s power lineage through satire, myth, and metal.
          </p>
          <Link to="/exhibitions/heads-of-state">
            <button className="mt-6 px-6 py-3 rounded-full border border-[#FBEEC1] hover:bg-[#FBEEC1] hover:text-black transition font-semibold">
              Explore the Timeline →
            </button>
          </Link>
        </div>

        {/* Visual */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/assets/heads-of-state-preview.jpg"
            alt="Heads of State Medallion"
            className="rounded-xl shadow-xl border border-neutral-800"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedExhibition;
