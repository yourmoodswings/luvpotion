import {useRef,useState} from 'react';
import {ikaImages} from '@/data/ika';

export default function IkaViewer(){
 const [view,setView]=useState(0),[zoom,setZoom]=useState(1);
 const drag=useRef(null);
 const [pan,setPan]=useState({x:0,y:0});
 function choose(i){setView(i);setZoom(1);setPan({x:0,y:0});}
 function move(x,y,el){const r=el.getBoundingClientRect();setPan({x:Math.max(-r.width*(zoom-1)/2,Math.min(r.width*(zoom-1)/2,x)),y:Math.max(-r.height*(zoom-1)/2,Math.min(r.height*(zoom-1)/2,y))});}
 return <div className="ika-viewer">
  <div className="ika-photo-stage" tabIndex={0} role="region" aria-label="Vase photograph. Zoom, then drag or use arrow keys to inspect." style={{touchAction:zoom>1?'none':'pan-y',cursor:zoom>1?'grab':'default'}} onKeyDown={e=>{if(zoom<=1||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();move(pan.x+(e.key==='ArrowLeft'?35:e.key==='ArrowRight'?-35:0),pan.y+(e.key==='ArrowUp'?35:e.key==='ArrowDown'?-35:0),e.currentTarget);}} onPointerDown={e=>{drag.current={x:e.clientX,y:e.clientY,pan};if(zoom>1)e.currentTarget.setPointerCapture(e.pointerId);}} onPointerMove={e=>{if(drag.current&&zoom>1)move(drag.current.pan.x+e.clientX-drag.current.x,drag.current.pan.y+e.clientY-drag.current.y,e.currentTarget);}} onPointerUp={e=>{if(drag.current&&zoom===1&&Math.abs(e.clientX-drag.current.x)>45&&Math.abs(e.clientY-drag.current.y)<70)choose((view+(e.clientX<drag.current.x?1:-1)+ikaImages.length)%ikaImages.length);drag.current=null;}} onPointerCancel={()=>drag.current=null}>
   <img src={ikaImages[view].src} alt={ikaImages[view].alt} draggable="false" style={{transform:`translate(${pan.x}px,${pan.y}px) scale(${zoom})`}}/>
   <span className="ika-view-count">0{view+1} / 0{ikaImages.length}</span>
  </div>
  <div className="ika-view-tools"><div className="ika-view-thumbnails" role="group" aria-label="Photographed views">{ikaImages.map((im,i)=><button key={im.src} onClick={()=>choose(i)} aria-pressed={view===i} aria-label={im.label}><img src={im.src} alt="" loading="lazy"/><span>{im.label}</span></button>)}</div><label>Zoom <output>{Math.round(zoom*100)}%</output><input aria-label="Zoom vase photograph" type="range" min="1" max="3" step=".1" value={zoom} onChange={e=>{setZoom(Number(e.target.value));setPan({x:0,y:0});}}/></label><button onClick={()=>{setZoom(1);setPan({x:0,y:0});}}>Reset photograph</button></div>
  <p className="ika-view-note">Swipe to change views. Zoom and drag to look closer. Original photographs from the artist’s presentation.</p>
 </div>;
}
