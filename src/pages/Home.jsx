import {Link, useSearchParams} from 'react-router-dom';
import {useContent} from '@/contexts/ContentContext';
import ExhibitionCards from '@/components/ExhibitionCards';
import Journey from '@/experience/Journey';
import './PlatformHome.css';

export default function Home(){
 const settings=useContent()?.settings;
 const [params]=useSearchParams();
 // Preserve previously shared scene links without making a project the homepage.
 if(params.has('scene'))return <Journey/>;
 return <div className="platform-home">
  <section className="brand-intro" aria-labelledby="brand-title">
   <div className="brand-overline"><span>INDEPENDENT ART. SHARED WORLDS.</span><span>LUVPOTION / ART & CULTURE</span></div>
   <div className="brand-intro-grid"><h1 id="brand-title">{settings?.brandTitle||'Art that stays'}<br/><span>{settings?.brandEmphasis||'with you.'}</span></h1><div className="brand-intro-copy"><p>{settings?.brandIntro||'LUVPOTION is a home for art, the people who make it, and the stories it carries. Enter an exhibition. Discover an artist. Find an object to live with.'}</p><a className="brand-action" href="#on-luvpotion">Discover what’s on</a></div></div>
   <div className="brand-signature" aria-hidden="true"><span>ART</span><i/><span>STORIES</span><i/><span>OBJECTS</span></div>
   <nav className="brand-shortcuts" aria-label="Discover LUVPOTION"><Link to="/exhibitions">Exhibitions</Link><Link to="/artists">Artists</Link><Link to="/drops">Shop</Link><Link to="/auctions">Auctions</Link></nav>
  </section>
  <section id="on-luvpotion" className="brand-exhibitions" aria-labelledby="featured-title">
   <div className="brand-section-heading"><div><span className="brand-label">FEATURED ON LUVPOTION</span><h2 id="featured-title">A different world<br/>behind every work.</h2></div><Link to="/exhibitions">All exhibitions</Link></div>
   <p className="brand-section-intro">Each project has its own voice. Step inside to experience its art, atmosphere, and story.</p>
   <ExhibitionCards/>
  </section>
  <section className="brand-purpose" aria-labelledby="purpose-title"><span className="brand-label">WHY WE’RE HERE</span><div><h2 id="purpose-title">{settings?.brandPurposeTitle||'Art is a way into someone else’s world.'}</h2><p>{settings?.brandPurpose||'We bring artists, exhibitions, and objects together so you can spend time with the ideas behind them. Painting, film, sound, and craft each offer a different way in. LUVPOTION is the place where those encounters meet.'}</p></div></section>
  <section className="brand-artists" aria-labelledby="artists-title"><div className="brand-artist-mark" aria-hidden="true"><span>THE</span><span>HUMAN</span><span>ELEMENT.</span></div><div><span className="brand-label">THE PEOPLE BEHIND THE WORK</span><h2 id="artists-title">Meet the minds.<br/>Follow the practice.</h2><p>Every project begins with a person and a way of seeing. Get to know the artists, their process, and what they want to put into the world.</p><Link className="brand-action" to="/artists">Discover the artists</Link><Link className="brand-secondary" to="/artists/the-maker">Featured practice: the maker</Link></div></section>
  <section className="brand-shop" aria-labelledby="shop-title"><div><span className="brand-label">THE LUVPOTION SHOP</span><h2 id="shop-title">Something to<br/>take with you.</h2></div><div><p>Artworks, sculptural vases, antiques, clothing, and everyday objects. Explore the collections and the stories that give them meaning.</p><div className="brand-shop-actions"><Link className="brand-action" to="/drops">Explore the shop</Link><Link className="brand-secondary" to="/auctions">Visit the auction preview</Link></div><p className="brand-shop-note">Individual pieces, prices, and availability are listed in the shop.</p></div></section>
 </div>;
}
