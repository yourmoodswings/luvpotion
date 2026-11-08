import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const merchItems = [
  {
    category: "Medallion",
    name: "OBJ Pendant",
    image: "/assets/1.png",
  },
  {
    category: "Cultural Archive",
    name: "Jakande Tribute Shirt",
    image: "/assets/2.png",
  },
  {
    category: "Functional Art",
    name: "Heads of State Vase",
    image: "/assets/3.png",
  },
];

const MuseumShopPreview = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`${
        isDark ? "bg-[#111111] text-[#FFFFFF]" : "bg-[#fdfdf9] text-[#111111]"
      } font-sans px-6 md:px-16 py-24 transition-colors duration-500`}
    >
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          className={`text-[2.5rem] md:text-[4rem] font-bold uppercase tracking-widest leading-tight ${
            isDark ? "text-[#FBEEC1]" : "text-[#111111]"
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Collectibles & Memory
          <span className="block text-sm tracking-[0.25em] mt-2 text-neutral-500">
            LUVPOTION Editions
          </span>
        </motion.h2>

        {/* Quote */}
        <motion.p
          className={`mt-6 text-base max-w-xl mx-auto italic ${
            isDark ? "text-neutral-400" : "text-neutral-700"
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          “Nothing we create is neutral. Each piece holds memory, material, and meaning.”
        </motion.p>

        <motion.p
          className={`mt-2 text-xs uppercase tracking-wide ${
            isDark ? "text-neutral-500" : "text-neutral-500"
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          — LUVPOTION Studio
        </motion.p>

        {/* Grid */}
        <div
          className={`mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 border-t ${
            isDark ? "border-neutral-800" : "border-neutral-300"
          } pt-12`}
        >
          {merchItems.map((item, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <p
                className={`uppercase tracking-wide text-xs mb-2 ${
                  isDark ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                {item.category}
              </p>

              <img
                src={item.image}
                alt={item.name}
                className="w-full max-h-[280px] object-contain mx-auto"
              />

              <p
                className={`mt-4 text-xs tracking-wider ${
                  isDark ? "text-neutral-500" : "text-neutral-500"
                }`}
              >
                {item.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MuseumShopPreview;
