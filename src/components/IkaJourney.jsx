import {useEffect,useRef,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {Link} from 'react-router-dom';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger.js';
import './IkaJourney.css';
const chapters=[
 {name:'Material',title:'Nothing is\njust waste.',body:'Concrete and reclaimed everyday materials, shaped by hand into storytelling artefacts.',word:'MATTER',image:'surface-folds',alt:'The textured concrete folds and painted courtyard of IKA'},
 {name:'Form',title:'Strength,\ngiven form.',body:'IKA draws on the artist’s Annang/Ibibio heritage: sturdiness, endurance and rebuilding.',word:'FORM',image:'front',alt:'The front view of IKA — VASE 1'},
 {name:'Colour',title:'Painting becomes\na place to return to.',body:'Every surface carries a painted narrative of Nigerian life, culture and memory.',word:'COLOUR',image:'paint-detail',alt:'A painted reading scene on the IKA vase'},
 {name:'Memory',title:'A familiar world.\nAnother perspective.',body:'School days, shared places and everyday encounters, recorded in a sculptural vessel.',word:'MEMORY',image:'rear',alt:'The rear of IKA with a painted school procession'},
 {name:'Collect',title:'A story to\nlive with.',body:'IKA — VASE 1. By Anietie James Ekiko and collaborating artists. Explore the piece through the artist’s photographs.',word:'IKA',image:'front',alt:'IKA — VASE 1 photographed from the front'},
];
export default function IkaJourney(){
 const root=useRef(null),progress=useRef(0),engine=useRef(null);
 const reduce=useReducedMotion(),[enabled,setEnabled]=useState(true),[chapter,setChapter]=useState(0);
 const animated=enabled&&!reduce;
 useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  const draw=p=>{progress.current=p;setChapter(Math.min(4,Math.floor(p*5)));};engine.current=draw;
  let tween;if(animated){const state={p:0};tween=gsap.to(state,{p:1,ease:'none',onUpdate:()=>draw(state.p),scrollTrigger:{trigger:root.current,start:()=>`top top+=${window.innerWidth>750?76:0}`,end:'bottom bottom',scrub:.45,invalidateOnRefresh:true}});}
  draw(progress.current);return()=>{tween?.scrollTrigger?.kill();tween?.kill();engine.current=null;};
 },[animated]);
 function go(i){const p=(i+.1)/5;if(!animated){engine.current?.(p);return;}const el=root.current;window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top+(el.offsetHeight-window.innerHeight)*p-(window.innerWidth>750?76:0),behavior:'smooth'});}
 const scene=chapters[chapter];
 return <section ref={root} className={`ika-journey ika-photo-story ${animated?'is-scroll-story':'is-step-story'}`} aria-label="IKA photographic story" data-chapter={chapter}>
 <div className="ika-journey-stage">
  <div className="ika-journey-top"><span>LUVPOTION / METAVASE / IKA</span><div><button onClick={()=>setEnabled(!enabled)} aria-pressed={animated}>{animated?'Motion on':'Step mode'}</button><Link to="/drops/metavase-flower-vase">View piece</Link></div></div>
  <div className="ika-scene-word" aria-hidden="true">{scene.word}</div>
  <div className="ika-stage-photo"><AnimatePresence initial={false}><motion.img key={scene.image} src={`/assets/ika/${scene.image}.webp`} alt={scene.alt} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:animated?.45:0}}/></AnimatePresence></div>
  <div className="ika-journey-caption"><span className="ika-scene-number">0{chapter+1} / {scene.name.toUpperCase()}</span><h1>{scene.title.split('\n').map((line,i)=><span key={line}>{i===1?<em>{line}</em>:line}</span>)}</h1><p>{scene.body}</p>{chapter===4?<Link className="ika-journey-cta" to="/drops/metavase-flower-vase">Discover VASE 1</Link>:<button className="ika-journey-next" onClick={()=>go(chapter+1)}>Continue the story</button>}</div>
  <div className="ika-journey-bottom"><nav aria-label="Story scenes">{chapters.map((c,i)=><button key={c.name} onClick={()=>go(i)} aria-current={chapter===i?'step':undefined} aria-label={`Scene ${i+1}: ${c.name}`}><span>0{i+1}</span><strong>{c.name}</strong><i/></button>)}</nav><div className="ika-journey-meta"><span>{animated?'SCROLL TO EXPLORE':'CHOOSE A CHAPTER'}</span><span>IMAGES FROM THE ARTIST’S PRESENTATION</span></div></div>
 </div></section>;
}
