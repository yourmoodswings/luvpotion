import {useEffect,useRef,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {Link} from 'react-router-dom';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger.js';
import './IkaJourney.css';

const chapters=[
 {name:'Material',title:'Nothing is\njust waste.',body:'An old towel. Concrete. The possibility of another life.',word:'MATTER'},
 {name:'Form',title:'A shape with\nsomething to say.',body:'The hand gives discarded materials weight, presence, and a new purpose.',word:'FORM'},
 {name:'Colour',title:'The surface\nfinds its voice.',body:'Turquoise meets a painted world. A flower vase becomes a storytelling artefact.',word:'COLOUR'},
 {name:'Memory',title:'Move closer.\nThere is a world here.',body:'A street. A gathering. A familiar place. Nigerian cultural memory, carried into form.',word:'MEMORY'},
 {name:'Collect',title:'Take the story\ninto your world.',body:'Meet IKA — VASE 1. Explore the original photographs and the details of the piece.',word:'IKA'},
];
const clamp=n=>Math.max(0,Math.min(1,n));
export default function IkaJourney(){
 const root=useRef(null),model=useRef(null),film=useRef(null),engine=useRef(null),progress=useRef(0),textures=useRef([]),painted=useRef(true);
 const reduce=useReducedMotion();
 const [enabled,setEnabled]=useState(true),[ready,setReady]=useState(false),[loaded,setLoaded]=useState(false),[failed,setFailed]=useState(false),[filmFailed,setFilmFailed]=useState(false),[chapter,setChapter]=useState(0),[inspect,setInspect]=useState(false),[info,setInfo]=useState(false);
 const animated=enabled&&!reduce;
 useEffect(()=>{let active=true;import('@google/model-viewer').then(()=>{if(active)setReady(true);}).catch(()=>{if(active)setFailed(true);});return()=>{active=false;};},[]);
 useEffect(()=>{const el=model.current;if(!el)return;const load=()=>{textures.current=el.model.materials.map(m=>({pbr:m.pbrMetallicRoughness,texture:m.pbrMetallicRoughness.baseColorTexture.texture,color:[...m.pbrMetallicRoughness.baseColorFactor]}));setLoaded(true);};const error=()=>setFailed(true);el.addEventListener('load',load);el.addEventListener('error',error);if(el.loaded)load();return()=>{el.removeEventListener('load',load);el.removeEventListener('error',error);};},[ready]);
 useEffect(()=>{
  const el=root.current;if(!el)return;
  gsap.registerPlugin(ScrollTrigger);
  function draw(p){
   progress.current=p;const scene=Math.min(4,Math.floor(p*5));setChapter(v=>v===scene?v:scene);
   el.style.setProperty('--journey-progress',p);
   const filmAlpha=animated&&!filmFailed?1-clamp((p-.32)/.1):0;
   const memoryAlpha=animated?clamp((p-.59)/.06)*(1-clamp((p-.79)/.07)):0;
   el.style.setProperty('--film-alpha',filmAlpha);
   el.style.setProperty('--memory-alpha',memoryAlpha);
   el.style.setProperty('--model-alpha',(1-filmAlpha)*(1-memoryAlpha));
   el.style.setProperty('--memory-scale',1+clamp((p-.60)/.2)*.5);
   el.style.setProperty('--model-shift',`${window.innerWidth>750?12*(1-clamp((p-.8)/.2)):0}%`);
   el.style.setProperty('--scene-light',`${48+p*32}%`);
   const v=film.current;
   if(animated&&v&&Number.isFinite(v.duration)&&!v.seeking){const time=Math.min(v.duration-.04,clamp(p/.4)*v.duration);if(Math.abs(v.currentTime-time)>.08)v.currentTime=time;}
   if(model.current&&loaded&&!inspect){
    model.current.cameraOrbit=`${-24+p*240}deg ${78-12*Math.sin(p*Math.PI)}deg ${(window.innerWidth<=750?155:125)-15*Math.sin(p*Math.PI)}%`;
    const paint=p>=.35||!animated;
    if(paint!==painted.current){textures.current.forEach(({pbr,texture,color})=>{pbr.baseColorTexture.setTexture(paint?texture:null);pbr.setBaseColorFactor(paint?color:[.25,.24,.21,1]);});painted.current=paint;}
   }
  }
  engine.current={draw};
  let tween;
  if(animated){const state={p:0};tween=gsap.to(state,{p:1,ease:'none',onUpdate:()=>draw(state.p),scrollTrigger:{trigger:el,start:()=>`top top+=${window.innerWidth>750?76:0}`,end:'bottom bottom',scrub:.65,invalidateOnRefresh:true}});}
  draw(progress.current);
  return()=>{tween?.scrollTrigger?.kill();tween?.kill();engine.current=null;};
 },[animated,loaded,inspect,filmFailed]);
 function go(i){setInspect(false);const p=(i+.1)/5;if(!animated){engine.current?.draw(p);return;}const el=root.current;const top=window.scrollY+el.getBoundingClientRect().top;window.scrollTo({top:top+(el.offsetHeight-window.innerHeight)*p-(window.innerWidth>750?76:0),behavior:'smooth'});}
 function reset(){setInspect(false);if(model.current)model.current.cameraOrbit=`${-24+progress.current*240}deg 75deg 105%`;}
 const scene=chapters[chapter];
 return <section ref={root} className={`ika-journey ${animated?'is-scroll-story':'is-step-story'} ${inspect?'is-inspecting':''}`} aria-label="IKA interactive scroll story" data-chapter={chapter}>
  <div className="ika-journey-stage">
   <div className="ika-journey-top"><span>LUVPOTION / METAVASE</span><div><button onClick={()=>setEnabled(!enabled)} aria-pressed={animated}>{animated?'Motion on':'Step mode'}</button><Link to="/drops/metavase-flower-vase">Skip to piece</Link></div></div>
   <div className="ika-scene-word" aria-hidden="true"><AnimatePresence mode="wait"><motion.span key={scene.word} initial={{opacity:0,y:animated?35:0}} animate={{opacity:1,y:0}} exit={{opacity:0,y:animated?-35:0}} transition={{duration:animated?.5:0}}>{scene.word}</motion.span></AnimatePresence></div>
   <div className="ika-stage-light" aria-hidden="true"/>
   <div className="ika-stage-film" aria-hidden="true"><video ref={film} src="/media/ika-formation.mp4" muted playsInline preload="auto" onSeeked={()=>engine.current?.draw(progress.current)} onLoadedMetadata={()=>engine.current?.draw(progress.current)} onError={()=>setFilmFailed(true)}/></div>
   <div className="ika-stage-object">{ready&&!failed?<model-viewer ref={model} src="/assets/ika/vase-study.glb" alt="Interactive IKA vase study" camera-controls={inspect?'':undefined} touch-action="pan-y" disable-pan="" interaction-prompt="none" shadow-intensity=".7" exposure="1.1" camera-orbit="-24deg 78deg 110%" interpolation-decay="80"/>:<img src="/assets/ika/front.webp" alt="Original photograph of IKA — VASE 1"/>}</div>
   <div className="ika-stage-memory" aria-hidden="true"><img src="/assets/ika/front.webp" alt=""/></div>
   <div className="ika-journey-caption"><AnimatePresence mode="wait" initial={false}><motion.div key={chapter} initial={{opacity:0,y:animated?20:0}} animate={{opacity:1,y:0}} exit={{opacity:0,y:animated?-12:0}} transition={{duration:animated?.32:0}}><span className="ika-scene-number">0{chapter+1} / {scene.name.toUpperCase()}</span><h1>{scene.title.split('\n').map((line,i)=><span key={line}>{i===1?<em>{line}</em>:line}</span>)}</h1><p>{scene.body}</p>{chapter===4?<Link className="ika-journey-cta" to="/drops/metavase-flower-vase">Discover VASE 1</Link>:<button className="ika-journey-next" onClick={()=>go(chapter+1)}>Continue the story <span aria-hidden="true">+</span></button>}</motion.div></AnimatePresence></div>
   <div className="ika-journey-object-tools">{chapter>=2&&loaded&&<button onClick={()=>{if(inspect)reset();else setInspect(true);}}>{inspect?'Return to story':'Take control of the vase'}</button>}{inspect&&<span>Drag to turn · pinch to zoom</span>}</div>
   <div className="ika-journey-bottom"><nav aria-label="Story scenes">{chapters.map((c,i)=><button key={c.name} onClick={()=>go(i)} aria-current={chapter===i?'step':undefined} aria-label={`Scene ${i+1}: ${c.name}`}><span>0{i+1}</span><strong>{c.name}</strong><i/></button>)}</nav><div className="ika-journey-meta"><span>{animated?'SCROLL TO UNFOLD THE STORY':'CHOOSE A SCENE TO CONTINUE'}</span><button onClick={()=>setInfo(!info)} aria-expanded={info}>About this experience</button></div>{info&&<p className="ika-journey-info">Film and 3D are artistic reconstructions. The photographs show the actual piece. By Anietie James Ekiko & collaborating artists.</p>}</div>
   {!loaded&&!failed&&<span className="ika-model-loading" role="status">Preparing the 3D form…</span>}
  </div>
 </section>;
}
