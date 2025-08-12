import { Link } from "react-router-dom";
import Header from "@/components/Header";

const exhibitions = [
  {
    slug: "heads-of-state",
    title: "🧠 Heads of State",
    subtitle: "A Timeline of Power and Parody",
    image: "/assets/exhibitions/hos.png",
  },
  {
    slug: "badger",
    title: "🦡 The Badger Scroll",
    subtitle: "Upcoming Auction Drop",
    image: "/assets/exhibitions/badger.png",
  },
];

export default function Exhibitions() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 px-4 md:px-16 pb-20 bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <h1 className="text-4xl md:text-5xl font-semibold mb-10 tracking-tight">
          🖼️ Exhibitions
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {exhibitions.map((exhibit) => (
            <Link
              key={exhibit.slug}
              to={`/exhibitions/${exhibit.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
            >
              <img
                src={exhibit.image}
                alt={exhibit.title}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold group-hover:underline transition">
                  {exhibit.title}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {exhibit.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
