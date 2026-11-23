import {useEffect,useRef,useState} from 'react';
import {ikaImages} from '@/data/ika';

export default function IkaViewer(){
 const [view,setView]=useState(0),[zoom,setZoom]=useState(1),[mode,setMode]=useState('photos'),[ready,setReady]=useState(false),[error,setError]=useState('');
 const model=useRef(null),drag=useRef(null);
 const [pan,setPan]=useState({x:0,y:0});
 function choose(i){setView(i);setZoom(1);setPan({x:0,y:0});}
 function move(x,y,el){const r=el.getBoundingClientRect();setPan({x:Math.max(-r.width*(zoom-1)/2,Math.min(r.width*(zoom-1)/2,x)),y:Math.max(-r.height*(zoom-1)/2,Math.min(r.height*(zoom-1)/2,y))});}
 useEffect(()=>{if(mode!=='model')return;let live=true;import('@google/model-viewer').then(()=>{if(live)setReady(true);}).catch(()=>{if(live)setError('3D could not load. The original photographs are available.');});return()=>{live=false;};},[mode]);
 useEffect(()=>{const el=model.current;if(!el)return;const failed=()=>setError('The 3D study could not load. Switch to photographs to inspect the work.');el.addEventListener('error',failed);return()=>el.removeEventListener('error',failed);},[ready,mode]);
 return <div className="ika-viewer">
  <div className="ika-view-tabs" role="group" aria-label="Product view"><button aria-pressed={mode==='photos'} onClick={()=>{setMode('photos');setError('');}}>Original photographs</button><button aria-pressed={mode==='model'} onClick={()=>{setMode('model');setError('');}}>Explore in 3D</button></div>
  {mode==='model'?<div className="ika-model-stage">{ready?<model-viewer ref={model} src="/assets/ika/vase-study.glb" poster="/assets/ika/front.webp" alt="AI reconstruction of the IKA vase" camera-controls="" touch-action="pan-y" shadow-intensity="1" exposure="1" camera-orbit="0deg 75deg 105%" disable-pan="" interaction-prompt="auto"/>:<p role="status">Opening the 3D study…</p>}</div>:<div className="ika-photo-stage" tabIndex={0} role="region" aria-label="Vase photograph. Zoom, then drag or use arrow keys to inspect." style={{touchAction:zoom>1?'none':'pan-y',cursor:zoom>1?'grab':'default'}} onKeyDown={e=>{if(zoom<=1||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();move(pan.x+(e.key==='ArrowLeft'?35:e.key==='ArrowRight'?-35:0),pan.y+(e.key==='ArrowUp'?35:e.key==='ArrowDown'?-35:0),e.currentTarget);}} onPointerDown={e=>{drag.current={x:e.clientX,y:e.clientY,pan};if(zoom>1)e.currentTarget.setPointerCapture(e.pointerId);}} onPointerMove={e=>{if(drag.current&&zoom>1)move(drag.current.pan.x+e.clientX-drag.current.x,drag.current.pan.y+e.clientY-drag.current.y,e.currentTarget);}} onPointerUp={e=>{if(drag.current&&zoom===1&&Math.abs(e.clientX-drag.current.x)>45&&Math.abs(e.clientY-drag.current.y)<70)choose((view+(e.clientX<drag.current.x?1:-1)+ikaImages.length)%ikaImages.length);drag.current=null;}} onPointerCancel={()=>drag.current=null}>
   <img src={ikaImages[view].src} alt={ikaImages[view].alt} draggable="false" style={{transform:`translate(${pan.x}px,${pan.y}px) scale(${zoom})`}}/>
   <span className="ika-view-count">0{view+1} / 0{ikaImages.length}</span>
  </div>}
  {error&&<p role="status">{error}</p>}
  {mode==='photos'?<div className="ika-view-tools"><div>{ikaImages.map((im,i)=><button key={im.src} onClick={()=>choose(i)} aria-pressed={view===i}>{im.label}</button>)}</div><label>Zoom <input aria-label="Zoom vase photograph" type="range" min="1" max="3" step=".1" value={zoom} onChange={e=>{setZoom(Number(e.target.value));setPan({x:0,y:0});}}/></label><button onClick={()=>{setZoom(1);setPan({x:0,y:0});}}>Reset photograph</button></div>:<div className="ika-view-tools"><span>Drag to rotate · pinch to zoom</span><button onClick={()=>{if(model.current)model.current.cameraOrbit='0deg 75deg 105%';}}>Reset view</button></div>}
  <p className="ika-view-note">{mode==='model'?'AI-generated 3D study. Unseen surfaces are approximated; use the original photographs to assess the actual piece.':'Four source photographs, including surface close-ups. Swipe between views. Zoom, then drag or use arrow keys to explore the texture.'}</p>
 </div>;
}
