import { useTheme } from "@/context/ThemeContext";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { useState, useRef, useEffect } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Header from "@/components/Header";
import { motion, useInView } from "framer-motion";




const HeroSection = () => {
    const heroRef = useRef(null);
    const inView = useInView(heroRef, { once: false, margin: "-20% 0px" });
  
    const lines = ["LUVPOTION", "MAKES", "OBJECTS", "MOVE", "CULTURE"];
  
    const containerVariants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.15,
        },
      },
    };
  
    const lineVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 1, 0.5, 1],
        },
      },
    };

  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const shadow = document.createElement("div");
    shadow.id = "cursor-shadow";
    shadow.style.position = "fixed";
    shadow.style.pointerEvents = "none";
    shadow.style.width = "20px";
    shadow.style.height = "20px";
    shadow.style.borderRadius = "50%";
    shadow.style.backgroundColor = "#000";
    shadow.style.boxShadow = "0 0 90px 45px rgba(0, 0, 0, 0.15)";
    shadow.style.zIndex = "9999";
    document.body.appendChild(shadow);

    const move = (e) => {
      shadow.style.left = `${e.clientX - 5}px`;
      shadow.style.top = `${e.clientY - 5}px`;
    };
    window.addEventListener("mousemove", move);
    return () => {
      document.body.removeChild(shadow);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#D6B58B] text-[#FFFFFF] font-sans overflow-hidden flex flex-col">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="flex-grow grid md:grid-cols-2 -mb-6 pt-[85px]">
        <div className="flex flex-col justify-center px-6 md:px-16 pb-10">
        <motion.h1
  ref={heroRef}
  variants={containerVariants}
  initial="hidden"
  animate={inView ? "visible" : "hidden"}
  className="text-[3.2rem] md:text-[5rem] leading-snug md:leading-tight font-bold uppercase tracking-widest text-[#FFFFFF] text-left space-y-[-12px]"
>
  {lines.map((line, index) => (
    <motion.span
      key={index}
      variants={lineVariants}
      className="block"
    >
      {line}
    </motion.span>
  ))}
</motion.h1>
</div>
<div className="overflow-hidden h-[500px] w-full flex gap-4 px-4 md:px-8">
  {/* Column 1 */}
  <div className="flex flex-col gap-4 animate-marquee-column-1">
    {[1, 2, 3, 4].map((i) => (
      <img
        key={`c1-${i}`}
        src={`/assets/hero-${i}.png`}
        className={`object-cover rounded-lg ${
          i % 2 === 0 ? 'h-40' : 'h-56'
        } w-full`}
        alt=""
      />
    ))}
  </div>

  {/* Column 2 */}
  <div className="flex flex-col gap-4 animate-marquee-column-2">
    {[5, 6, 7, 8].map((i) => (
      <img
        key={`c2-${i}`}
        src={`/assets/hero-${i}.png`}
        className={`object-cover rounded-lg ${
          i % 2 === 0 ? 'h-52' : 'h-64'
        } w-full`}
        alt=""
      />
    ))}
  </div>
</div>

</div>

      {/* Footer aligned to columns */}
      <div className="hidden md:grid grid-cols-4 px-6 md:px-16 py-6 text-[#FFFFFF] text-[0.95rem] font-normal uppercase w-full">
        <a href="#" className="flex items-center nav-hover gap-2 justify-start hover:underline">
          <FaTwitter className="text-xl" />
          <span>TWITTER</span>
          <span className="text-xl ml-1">→</span>
        </a>
        <a href="#" className="flex items-center gap-2 nav-hover  justify-start hover:underline">
          <FaInstagram className="text-xl" />
          <span>INSTAGRAM</span>
          <span className="text-xl ml-1">→</span>
        </a>
        <a href="#" className="flex items-center nav-hover  gap-2 justify-start hover:underline">
          <FaYoutube className="text-xl" />
          <span>YOUTUBE</span>
          <span className="text-xl ml-1">→</span>
        </a>
        <a href="#" className="flex items-center gap-2 nav-hover justify-start hover:underline">
          <SiTiktok className="text-xl" />
          <span>TIKTOK</span>
          <span className="text-xl ml-1">→</span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;