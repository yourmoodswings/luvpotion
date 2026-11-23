import {lazy,Suspense,useCallback,useState} from 'react';
import {Link} from 'react-router-dom';
import {useReducedMotion} from 'framer-motion';
import {courtyardStops} from '@/data/courtyard';
import './Courtyard.css';
const Scene=lazy(()=>import('@/components/CourtyardScene'));
export default function Courtyard(){
 const [entered,setEntered]=useState(false),[ready,setReady]=useState(false),[failed,setFailed]=useState(false),[selected,setSelected]=useState(null),[visited,setVisited]=useState([]),[details,setDetails]=useState(false);
 const reduced=useReducedMotion(),onReady=useCallback(()=>setReady(true),[]),onError=useCallback(()=>setFailed(true),[]);
 function visit(i){setSelected(i);setDetails(true);setVisited(v=>v.includes(i)?v:[...v,i]);}
 const stop=selected==null?null:courtyardStops[selected];
 return <section className="courtyard-experience" aria-label="IKA courtyard experience">
  {entered&&!failed&&<Suspense fallback={<div className="courtyard-loading" role="status">Opening the courtyard…</div>}><Scene destination={selected} onSelect={visit} onReady={onReady} onError={onError} reduced={!!reduced}/></Suspense>}
  <header className="courtyard-header"><Link to="/exhibitions/metavase">Leave the courtyard</Link><span>IKA / A SPATIAL STUDY</span></header>
  {!entered?<div className="courtyard-welcome"><img src="/assets/ika/document-ika-wordmark.webp" alt="IKA"/><span className="ika-kicker">THE COURTYARD / INTERACTIVE PREVIEW</span><h1>A place to<br/>encounter the work.</h1><p>Move through the garden, pause at the workbench, and discover the stories carried by each painted surface.</p><button className="ika-primary" onClick={()=>setEntered(true)}>Enter the courtyard</button><small>A layout study. The artist’s house, garden and filmed works will replace these temporary surroundings.</small></div>:<>
   {failed?<div className="courtyard-fallback"><h1>Explore at your own pace.</h1><p>The 3D view is unavailable on this device. You can still open every story below.</p></div>:<div className="courtyard-hint" role="status">{ready?'Tap the ground to walk · drag to look around · pinch to zoom':'Preparing the space…'}</div>}
   <nav className="courtyard-stops" aria-label="Places in the courtyard">{courtyardStops.map((s,i)=><button key={s.id} onClick={()=>visit(i)} aria-pressed={selected===i}><span>{String(i+1).padStart(2,'0')}</span>{s.label}{visited.includes(i)&&<small aria-label="Visited">●</small>}</button>)}</nav>
   {stop&&details&&<aside className="courtyard-story" aria-label={stop.title}><button className="courtyard-close" onClick={()=>setDetails(false)} aria-label="Close story">Close</button><img src={stop.image} alt={stop.title}/><div><span className="ika-kicker">{stop.label}</span><h2>{stop.title}</h2><p>{stop.body}</p><Link className="ika-primary" to={stop.to}>{stop.action}</Link><button className="courtyard-next" onClick={()=>visit((selected+1)%courtyardStops.length)}>Continue the walk</button></div></aside>}
   <span className="courtyard-progress">{visited.length} / {courtyardStops.length} places discovered</span>
  </>}
 </section>;
}
