import {useEffect,useRef,useState} from 'react';
import {ikaImages} from '@/data/ika';

export default function IkaViewer(){
 const [view,setView]=useState(0),[zoom,setZoom]=useState(1),[mode,setMode]=useState('photos'),[ready,setReady]=useState(false),[error,setError]=useState('');
 const model=useRef(null),drag=useRef(null);
 useEffect(()=>{if(mode!=='model')return;let live=true;import('@google/model-viewer').then(()=>{if(live)setReady(true);}).catch(()=>{if(live)setError('3D could not load. The original photographs are available.');});return()=>{live=false;};},[mode]);
 useEffect(()=>{const el=model.current;if(!el)return;const failed=()=>setError('The 3D study could not load. Switch to photographs to inspect the work.');el.addEventListener('error',failed);return()=>el.removeEventListener('error',failed);},[ready,mode]);
 return <div className="ika-viewer">
  <div className="ika-view-tabs" role="group" aria-label="Product view"><button aria-pressed={mode==='photos'} onClick={()=>{setMode('photos');setError('');}}>Original photographs</button><button aria-pressed={mode==='model'} onClick={()=>{setMode('model');setError('');}}>Explore in 3D</button></div>
  {mode==='model'?<div className="ika-model-stage">{ready?<model-viewer ref={model} src="/assets/ika/vase-study.glb" poster="/assets/ika/front.webp" alt="AI reconstruction of the IKA vase" camera-controls="" touch-action="pan-y" shadow-intensity="1" exposure="1" camera-orbit="0deg 75deg 105%" disable-pan="" interaction-prompt="auto"/>:<p role="status">Opening the 3D study…</p>}</div>:<div className="ika-photo-stage" onPointerDown={e=>{drag.current=e.clientX;}} onPointerUp={e=>{if(drag.current!==null&&Math.abs(e.clientX-drag.current)>45){setView(v=>1-v);setZoom(1);}drag.current=null;}} onPointerCancel={()=>drag.current=null}>
   <img src={ikaImages[view].src} alt={ikaImages[view].alt} draggable="false" style={{transform:`scale(${zoom})`}}/>
   <span className="ika-view-count">0{view+1} / 02</span>
  </div>}
  {error&&<p role="status">{error}</p>}
  {mode==='photos'?<div className="ika-view-tools"><div>{ikaImages.map((im,i)=><button key={im.src} onClick={()=>{setView(i);setZoom(1);}} aria-pressed={view===i}>{im.label}</button>)}</div><label>Zoom <input aria-label="Zoom vase photograph" type="range" min="1" max="2.5" step=".1" value={zoom} onChange={e=>setZoom(Number(e.target.value))}/></label></div>:<div className="ika-view-tools"><span>Drag to rotate · pinch to zoom</span><button onClick={()=>{if(model.current)model.current.cameraOrbit='0deg 75deg 105%';}}>Reset view</button></div>}
  <p className="ika-view-note">{mode==='model'?'AI-generated 3D study. Unseen surfaces are approximated; use the original photographs to assess the actual piece.':'Two original photographed views. Swipe to change view, or zoom to inspect the painted surface.'}</p>
 </div>;
}
