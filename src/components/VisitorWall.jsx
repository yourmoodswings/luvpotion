import { motion } from "framer-motion";

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
  return (
    <section className="font-serif px-6 md:px-12 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Echoes from the Gallery
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {visitors.map((visitor, index) => (
            <motion.div
              key={index}
              className="border border-neutral-800 rounded-xl bg-neutral-800 p-6 text-left flex gap-4 items-start shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <img
                src={visitor.avatar}
                alt={visitor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm italic text-[#FBEEC1] mb-2">"{visitor.quote}"</p>
                <p className="text-xs text-[#FBEEC1]">— {visitor.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisitorWall;
