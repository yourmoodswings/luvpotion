import { FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full bg-black text-[#FBEEC1] font-serif overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <img
      src="/assets/hero-bg.jpg"
      alt="Artistic Background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

  {/* All content inside a relative container with z-10 */}
  <div className="relative z-10 h-full w-full">
    {/* Navbar */}
    <div className="absolute top-0 left-0 w-full px-8 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold tracking-wide">LUVPOTION</div>

      <nav className="hidden md:flex gap-8 text-lg pr-40">
        <a href="/exhibitions" className="hover:underline">Exhibitions</a>
        <a href="/drops" className="hover:underline">Shop</a>
      </nav>
    </div>

    {/* Hero Text */}
    <div className="h-full flex flex-col justify-center items-center text-center px-6">
      <h2 className="text-[3.2rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-light leading-tight tracking-tight">
        POTION <em className="italic font-medium">for</em> <br />
        <span className="block font-bold">ART & HISTORY</span>
      </h2>

      <div className="mt-10 text-lg sm:text-xl">
        <p className="font-semibold"></p>
        <p className="text-[#e3d7b2] mt-2 text-sm max-w-xl mx-auto"></p>
      </div>
    </div>

    {/* Social Links */}
    <div className="absolute bottom-6 right-6 flex gap-6 text-[#FBEEC1] text-sm items-center">
      <a href="#" className="flex items-center gap-1"><FaYoutube /> YouTube</a>
      <a href="#" className="flex items-center gap-1"><FaTwitter /> Twitter</a>
      <a href="#" className="flex items-center gap-1"><SiTiktok /> TikTok</a>
      <a href="#" className="flex items-center gap-1"><FaInstagram /> Instagram</a>
    </div>
  </div>
</section>

  );
};

export default HeroSection;
