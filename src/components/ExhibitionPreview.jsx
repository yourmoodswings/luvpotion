import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const exhibitions = [
  {
    title: "Heads of State",
    slug: "/heads-of-state",
    image: "/assets/heads-of-state-preview.jpg",
    description: "A dynasty of power, satire, and metal. Thirteen leaders. One crown.",
  },
  {
    title: "AfroAlchemy",
    slug: "/afroalchemy",
    image: "/assets/afroalchemy.jpg",
    description: "Where ancestral wisdom meets speculative art. Magic. Memory. Mutation.",
  },
  {
    title: "Love’s Labours",
    slug: "/loves-labours",
    image: "/assets/loves-labours.jpg",
    description: "Art inspired by heartbreak, rituals, and rebirth.",
  },
];

const ExhibitionPreview = () => {
  const scrollRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let isDown = false;
    let startX, scrollLeft;

    const onMouseDown = (e) => {
      isDown = true;
      slider.classList.add("cursor-grabbing");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const onMouseUp = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mouseleave", onMouseUp);
    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mousemove", onMouseMove);

    return () => {
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mouseleave", onMouseUp);
      slider.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className={`${isDark ? "bg-[#111111] text-[#FFFFFF]" : "bg-[#fdfdf9] text-[#111111]"} font-sans py-24 px-6 md:px-16`}>
      <motion.h2
        className="text-[2.5rem] md:text-[3.5rem] font-bold uppercase tracking-widest mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Explore Our Digital Exhibitions
      </motion.h2>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto max-w-full pb-4 hide-scrollbar cursor-grab select-none"
      >
        {exhibitions.map((exhibit, index) => (
          <motion.div
            key={index}
            className={`min-w-[300px] md:min-w-[340px] flex-shrink-0 rounded-xl overflow-hidden border hover:scale-[1.02] transition-transform duration-300 ${
              isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-300"
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <Link to={exhibit.slug} className="block h-full">
              <img
                src={exhibit.image}
                alt={exhibit.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{exhibit.title}</h3>
                <p className="text-sm">{exhibit.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExhibitionPreview;
