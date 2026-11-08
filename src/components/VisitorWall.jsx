import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const visitors = [
  {
    name: "Anonymous",
    avatar: "https://ui-avatars.com/api/?name=A&background=1f1f1f&color=fff",
    quote: "When I saw the OBJ medallion... I felt like history finally looked back.",
  },
  {
    name: "Folake O.",
    avatar: "https://ui-avatars.com/api/?name=Folake&background=292929&color=fff",
    quote: "This isn't just art. It's what the museums should've been doing.",
  },
  {
    name: "Visitor #371",
    avatar: "https://ui-avatars.com/api/?name=371&background=111111&color=fff",
    quote: "I scanned the smart label and heard Abacha speak. I wasn’t ready.",
  },
  {
    name: "Curious Mind",
    avatar: "https://ui-avatars.com/api/?name=C+M&background=333333&color=fff",
    quote: "AfroAlchemy? It's like tradition met science and fell in love.",
  },
];

const VisitorWall = () => {
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
          className="text-[2rem] md:text-[3rem] font-bold uppercase tracking-widest leading-tight mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Echoes from the Wall
        </motion.h2>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {visitors.map((visitor, index) => (
            <motion.div
              key={index}
              className={`rounded-xl p-6 flex gap-4 items-start border ${
                isDark
                  ? "bg-neutral-900 border-neutral-800"
                  : "bg-white border-neutral-300"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={visitor.avatar}
                alt={visitor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p
                  className={`text-sm italic ${
                    isDark ? "text-[#FBEEC1]" : "text-neutral-700"
                  } mb-2`}
                >
                  “{visitor.quote}”
                </p>
                <p
                  className={`text-xs uppercase tracking-wide ${
                    isDark ? "text-neutral-500" : "text-neutral-500"
                  }`}
                >
                  — {visitor.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisitorWall;
