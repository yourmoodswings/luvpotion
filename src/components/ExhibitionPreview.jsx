import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
  let isDown = false;
  let startX;
  let scrollLeft;

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const mouseDownHandler = (e) => {
      isDown = true;
      slider.classList.add("cursor-grabbing");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const mouseLeaveHandler = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    const mouseUpHandler = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    const mouseMoveHandler = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", mouseDownHandler);
    slider.addEventListener("mouseleave", mouseLeaveHandler);
    slider.addEventListener("mouseup", mouseUpHandler);
    slider.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      slider.removeEventListener("mousedown", mouseDownHandler);
      slider.removeEventListener("mouseleave", mouseLeaveHandler);
      slider.removeEventListener("mouseup", mouseUpHandler);
      slider.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <section className="py-16 px-6 md:px-12 font-serif">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">
        Explore Our Digital Exhibitions
      </h2>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto pb-4 hide-scrollbar cursor-grab select-none"
      >
        {exhibitions.map((exhibit, index) => (
          <motion.div
            key={index}
            className="min-w-[300px] md:min-w-[340px] flex-shrink-0 bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:scale-[1.02] transition-transform duration-300"
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
                <h3 className="text-xl text-[#e3d7b2] font-semibold mb-2">{exhibit.title}</h3>
                <p className="text-sm text-[#e3d7b2]">{exhibit.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExhibitionPreview;
