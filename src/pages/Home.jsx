import { useTheme } from "@/context/ThemeContext";

import AREXperience from "@/components/ARExperience";
import ManifestoSection from "@/components/ManifestoSection";
import MuseumShopPreview from "@/components/MuseumShopPreview";
import VisitorWall from "@/components/VisitorWall";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedExhibition from "@/components/FeaturedExhibition";
import ExhibitionPreview from "@/components/ExhibitionPreview";

const HomePage = () => {
  const { theme, toggleTheme } = useTheme();

  const getBg = (texture) =>
    theme === "dark" ? `bg-[url('/assets/${texture}')] bg-cover bg-center bg-no-repeat` : "bg-white";

  const solid = theme === "dark" ? "bg-[#181911]" : "bg-white";

  return (
    <div className={`font-serif min-h-screen ${theme === 'dark' ? 'text-[#FBEEC1]' : 'text-black'}`}>
      {/* Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded border border-[#FBEEC1] text-[#FBEEC1] text-sm hover:bg-[#FBEEC1] hover:text-black transition"
        >
          {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>

      <section className={getBg("museum_home_texture.jpg")}>
        <HeroSection />
      </section>

      <section className={getBg("museum_home_texture2.jpg")}>
        <ManifestoSection />
      </section>

      <section className={getBg("museum_home_texture3.jpg")}>
        <FeaturedExhibition />
      </section>

      <section className={getBg("museum_home_texture.jpg")}>
        <ExhibitionPreview />
      </section>

      <section className={getBg("museum_home_texture2.jpg")}>
        <AREXperience />
      </section>

      <section className={getBg("museum_home_texture3.jpg")}>
        <MuseumShopPreview />
      </section>

      <section className={solid}>
        <VisitorWall />
      </section>

      <section className={solid}>
        <NewsletterSignup />
      </section>

      <section className={solid}>
        <Footer />
      </section>
    </div>
  );
};

export default HomePage;
