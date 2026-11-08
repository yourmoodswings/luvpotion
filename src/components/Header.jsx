import { useTheme } from "@/context/ThemeContext";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { useState } from "react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 bg-[#5A350E] text-[#FFFFFF] flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="text-xl md:text-3xl font-semibold tracking-tight">
            <img src="/assets/logo.svg" alt="Logo" className="h-8 inline mr-2" />
            LUVPOTION
          </div>

          <nav className="hidden md:flex justify-between w-full max-w-[800px] mx-auto text-[20px] font-semibold uppercase tracking-wider px-8">
            <div className="relative group nav-hover">
              <a href="#visit" className="relative z-10">VISIT</a>
              <div className="absolute left-0 top-full mt-2 w-40 bg-white text-black rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <a href="/visit/tickets" className="block px-4 py-2 hover:bg-gray-200">Tickets</a>
                <a href="/visit/directions" className="block px-4 py-2 hover:bg-gray-200">Directions</a>
              </div>
            </div>
            <a href="exhibitions" className="nav-hover">EXHIBITIONS</a>
            <div className="relative group nav-hover">
              <a href="#informations" className="relative z-10">INFORMATIONS</a>
              <div className="absolute left-0 top-full mt-2 w-40 bg-white text-black rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <a href="about" className="block px-4 py-2 hover:bg-gray-200">ABOUT</a>
                <a href="contact" className="block px-4 py-2 hover:bg-gray-200">CONTACT</a>
              </div>
            </div>
            <a href="drops" className="nav-hover">SHOP</a>
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={toggleTheme} className="text-xl md:text-2xl">
              {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl md:hidden">
              <HiOutlineMenuAlt3 />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#5A350E] flex flex-col items-center justify-center gap-8 text-2xl font-bold">
          <a href="#visit" onClick={() => setMenuOpen(false)}>VISIT</a>
          <a href="exhibitions" onClick={() => setMenuOpen(false)}>EXHIBITIONS</a>
          <a href="#info" onClick={() => setMenuOpen(false)}>INFORMATION</a>
          <a href="#shop" onClick={() => setMenuOpen(false)}>SHOP</a>
          <div className="flex gap-6 text-lg pt-6">
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><SiTiktok /></a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
