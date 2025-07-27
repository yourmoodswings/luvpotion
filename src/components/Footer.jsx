import React from 'react';

function Footer() {
  return (
    <footer className="px-8 py-16 md:py-24 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1 - Branding & Hours */}
        <div>
          <h2 className="text-3xl font-bold tracking-wide mb-4">LUVPOTION</h2>
          <p className="mb-6 max-w-xs leading-relaxed">
            A digital museum preserving memory through exhibitions, ritual, and storytelling.
          </p>
        </div>

        {/* Column 2 - Navigation */}
        <div>
          <h4 className="uppercase tracking-wide text-sm mb-4">Navigation</h4>
          <ul className="space-y-2">
            <li><a href="/exhibitions" className="hover:underline">Exhibitions</a></li>
            <li><a href="/drops" className="hover:underline">Shop</a></li>

          </ul>
        </div>

        {/* Column 3 - Subscribe + Socials */}
<div>
  <h4 className="uppercase tracking-wide text-sm mb-4">Stay Updated</h4>

  {/* Inline subscribe form */}
  <form className="flex overflow-hidden rounded-[15px] border border-[#fcefb4] bg-neutral-900">
    <input
      type="email"
      placeholder="Your email"
      className="flex-1 px-4 py-2 bg-transparent text-[#FBEEC1] placeholder-[#FBEEC1] focus:outline-none"
    />
    <button
      type="submit"
      className="px-5 py-2 text-[#FBEEC1] hover:bg-[#fcefb4] hover:text-black transition-colors"
    >
      Subscribe
    </button>
  </form>

  {/* Social Links */}
  <div className="flex items-center space-x-4 mt-6">
    <a href="#" aria-label="Instagram" className="text-[#FBEEC1] text-lg hover:opacity-70">
      <i className="fab fa-instagram" />
    </a>
    <a href="#" aria-label="TikTok" className="text-[#FBEEC1] text-lg hover:opacity-70">
      <i className="fab fa-tiktok" />
    </a>
    <a href="#" aria-label="Threads" className="text-[#FBEEC1] text-lg hover:opacity-70">
      <i className="fab fa-threads" />
    </a>
  </div>
</div>
</div>
    </footer>
  );
}

export default Footer;
