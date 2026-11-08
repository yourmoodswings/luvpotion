import {useContent} from '@/contexts/ContentContext';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
const links=[['/exhibitions','Exhibitions'],['/artists','Artists'],['/drops','Shop'],['/auctions','Auctions']];
export default function SiteLayout({children}) {
 const content=useContent(),settings=content?.settings;
 const [open,setOpen]=useState(false),menu=useRef(null);
 const location=useLocation(),{cart}=useCart();
 const section=location.pathname.split('/')[1]||'home';
 const cinematic=location.pathname==='/exhibitions/heads-of-state'&&/^#chapter-\d+$/.test(location.hash);
 const dark=section==='exhibitions'||section==='auctions';
 useEffect(()=>{setOpen(false);window.scrollTo({top:0,behavior:'instant'});const names={home:'Art, objects & cultural memory',drops:'The shop',exhibitions:'The exhibitions',artists:'The artists',auctions:'The auction room',cart:'Your bag',checkout:'Checkout',account:'Your collection',orders:'Your order',studio:'Local studio'};document.title=`${names[section]||'Explore'} — LUVPOTION`;},[location.pathname,section]);
 useEffect(()=>{const close=e=>{if(e.key==='Escape'&&open){setOpen(false);menu.current?.focus();}};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);},[open]);
 return <div className={`lp-world page-${section} ${dark?'lp-dark':''} ${cinematic?'cinematic-shell':''}`}><a href="#main-content" className="gallery-skip">Skip to content</a>
 <header className="lp-header"><Link to="/" className="gallery-logo" aria-label="LUVPOTION home">LUVPOTION<span>®</span></Link><nav id="site-nav" className={open?'open':''} aria-label="Main navigation">{links.map(([to,label])=><NavLink key={to} to={to}>{label}</NavLink>)}<NavLink className="mobile-collection-link" to="/account">Your collection</NavLink></nav><div className="header-utilities"><NavLink className="header-account" to="/account">Your collection</NavLink><NavLink className="header-bag" to="/cart">Bag <span>{cart?.items_count||0}</span></NavLink><button ref={menu} className="lp-menu" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="site-nav">{open?'Close −':'Menu +'}</button></div></header>
 {open&&<button className="nav-scrim" aria-label="Close navigation" onClick={()=>{setOpen(false);menu.current?.focus();}}/>}
 {settings?.announcement&&<div className="site-announcement" role="status">{settings.announcement}</div>}
 <main id="main-content" tabIndex={-1} key={location.pathname} className="lp-route">{children}</main>
 <footer className="lp-footer"><div><div><span className="lp-eyebrow">AN INDEPENDENT WORLD OF ART & OBJECTS</span><p>{settings?.footerLine||'History, recast.'}<br/><em>{settings?.footerEmphasis||'Culture, collected.'}</em></p></div><nav aria-label="Explore"><span className="lp-eyebrow">EXPLORE</span><Link to="/exhibitions">The exhibitions </Link><Link to="/artists">The artists </Link><Link to="/drops">The object library </Link><Link to="/auctions">The auction room </Link></nav><nav aria-label="Your LUVPOTION"><span className="lp-eyebrow">YOUR LUVPOTION</span><Link to="/cart">Your bag </Link><Link to="/account">Saved orders </Link>{import.meta.env.DEV && <Link to="/studio">Local studio </Link>}{settings?.contactEmail&&<a href={`mailto:${settings.contactEmail}`}>Contact the studio </a>}<button className="footer-top" onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>Back to top </button></nav></div><strong aria-hidden="true">LUVPOTION</strong><small>© {new Date().getFullYear()} LUVPOTION <span>ART. OBJECTS. CULTURAL MEMORY.</span><span>{content?.auctions?.some(l=>l.live&&l.biddingEnabled)?'AUCTIONS · PAY WITH PAYSTACK':'COLLECTION PREVIEW'}</span></small></footer></div>;
}
