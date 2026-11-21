import {useEffect,useRef} from 'react';
export default function IkaHeroFilm(){
 const video=useRef(null);
 useEffect(()=>{const el=video.current;const preference=matchMedia('(prefers-reduced-motion: reduce)');let started=false;const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting){el.pause();return;}if(!started&&!preference.matches){started=true;el.play().catch(()=>{});}},{threshold:.3});observer.observe(el);const stop=()=>{if(preference.matches)el.pause();};preference.addEventListener('change',stop);return()=>{observer.disconnect();preference.removeEventListener('change',stop);};},[]);
 return <div className="ika-hero-film"><video ref={video} src="/media/ika-formation.mp4" poster="/assets/ika/front.webp" muted playsInline controls preload="metadata" aria-label="IKA material transformation film"/><span>THE BECOMING / AI VISUALISATION</span></div>;
}
