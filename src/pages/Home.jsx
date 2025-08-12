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
     
      <section className={`${getBg("museum_home_texture.jpg")} overflow-x-hidden`}>

        <HeroSection />
      </section>

      <section className={`${getBg("museum_home_texture2.jpg")} overflow-x-hidden`}>

        <ManifestoSection />
      </section>

      <section className={`${getBg("museum_home_texture3.jpg")} overflow-x-hidden`}>

        <FeaturedExhibition />
      </section>

     <section className={`${getBg("museum_home_texture.jpg")} overflow-x-hidden`}>

        <ExhibitionPreview />
      </section>

      <section className={`${getBg("museum_home_texture2.jpg")} overflow-x-hidden`}>

        <AREXperience />
      </section>

      <section className={`${getBg("museum_home_texture3.jpg")} overflow-x-hidden`}>

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
