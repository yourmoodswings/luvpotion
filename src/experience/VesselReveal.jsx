import {useState} from 'react';
import {materialSteps} from './journeyData';
export default function VesselReveal({image=''}){
 const [step,setStep]=useState(0),[angle,setAngle]=useState(0);
 return <div className={`vessel-reveal vessel-phase-${step}`}>
  <div className="vessel-laboratory">
   <span className="scene-coordinate">IKA V1 / MATERIAL STUDY</span>
   {image?<img className="vessel-real" src={image} alt="IKA V1 artwork supplied by the studio" style={{transform:`rotate(${angle/12}deg)`}}/>:<div className="vessel-sculpture" style={{'--vessel-angle':`${angle}deg`}} aria-label="Abstract interactive vessel study; not a photograph or exact model of IKA V1"><div className="vessel-rim"/><div className="vessel-body"><i/><i/><i/><i/><i/>{step===2&&<div className="vessel-inscription"><span>ALI</span><small>&</small><span>SIMBI</span></div>}</div><div className="vessel-shadow"/></div>}
   <small className="scene-image-note">{image?'Studio-supplied image':'Abstract form study · original IKA V1 photography forthcoming'}</small>
  </div>
  <div className="vessel-experiment"><div className="material-switch" role="group" aria-label="Explore the making of IKA V1">{materialSteps.map((s,i)=><button key={s.label} aria-pressed={i===step} onClick={()=>setStep(i)}>{s.label}</button>)}</div><div className="material-caption" key={step} aria-live="polite"><h3>{materialSteps[step].title}</h3><p>{materialSteps[step].body}</p></div><label className="vessel-angle">{image?'Tilt the image':'Shift the light on the form'}<input type="range" min="-30" max="30" value={angle} onChange={e=>setAngle(Number(e.target.value))}/></label>{step<2&&<button className="journey-primary" onClick={()=>setStep(step+1)}>{step===0?'Give it form':'Reveal the memory'}</button>}</div>
 </div>;
}

