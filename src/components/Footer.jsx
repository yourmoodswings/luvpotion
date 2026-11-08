import { useTheme } from "@/context/ThemeContext";

function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className={`${
        isDark ? "bg-[#111111] text-[#FFFFFF]" : "bg-[#fdfdf9] text-[#111111]"
      } font-sans px-6 md:px-16 py-24 border-t ${
        isDark ? "border-neutral-800" : "border-neutral-300"
      } transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Column 1 - Branding & Ethos */}
        <div>
          <h2
            className={`text-2xl md:text-3xl font-bold tracking-widest uppercase ${
              isDark ? "text-[#FBEEC1]" : "text-[#111111]"
            } mb-4`}
          >
            LUVPOTION
          </h2>
          <p className="text-sm leading-relaxed">
            A living archive. A digital museum. Preserving memory through exhibition, ritual, and collectible form.
          </p>
        </div>

        {/* Column 2 - Navigation */}
        <div>
          <h4 className="uppercase tracking-wide text-sm mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/exhibitions" className="hover:underline">
                Exhibitions
              </a>
            </li>
            <li>
              <a href="/drops" className="hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Subscribe + Social */}
        <div>
          <h4 className="uppercase tracking-wide text-sm mb-4">Stay Updated</h4>

          <form
            className={`flex overflow-hidden rounded-full border ${
              isDark
                ? "border-[#fcefb4] bg-neutral-900"
                : "border-neutral-300 bg-white"
            }`}
          >
            <input
              type="email"
              placeholder="Your email"
              className={`flex-1 px-4 py-2 text-sm font-medium placeholder-opacity-60 focus:outline-none ${
                isDark
                  ? "bg-transparent text-[#FBEEC1] placeholder-[#FBEEC1]"
                  : "bg-transparent text-black placeholder-black"
              }`}
            />
            <button
              type="submit"
              className={`px-5 py-2 font-semibold text-sm tracking-wide ${
                isDark
                  ? "text-[#FBEEC1] hover:bg-[#fcefb4] hover:text-black"
                  : "text-black hover:bg-neutral-800 hover:text-white"
              } transition-colors`}
            >
              Subscribe
            </button>
          </form>

          <div className="flex items-center space-x-4 mt-6 text-lg">
            <a href="#" className="hover:opacity-70" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="#" className="hover:opacity-70" aria-label="TikTok">
              <i className="fab fa-tiktok" />
            </a>
            <a href="#" className="hover:opacity-70" aria-label="Threads">
              <i className="fab fa-threads" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
