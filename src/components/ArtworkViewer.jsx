import { useEffect,useRef,useState } from 'react';
import { clampView } from '@/lib/artworkView';
export default function ArtworkViewer({src,alt}){
 const [view,setView]=useState({zoom:2,x:0,y:0}),[dragging,setDragging]=useState(false);
 const viewport=useRef(null),artwork=useRef(null),drag=useRef(null),initialZoom=useRef(2);
 function imageLoaded(e){
   const image=e.currentTarget;
   initialZoom.current=image.naturalWidth>image.naturalHeight?1.1:2;
   setView({zoom:initialZoom.current,x:0,y:0});
 }
 const [placement,setPlacement]=useState({width:0,artWidth:0,desktop:false});
 useEffect(()=>{
   const measure=()=>setPlacement({width:viewport.current?.clientWidth||0,artWidth:artwork.current?.offsetWidth||0,desktop:window.innerWidth>700});
   const observer=new ResizeObserver(measure);
   if(viewport.current)observer.observe(viewport.current);
   if(artwork.current)observer.observe(artwork.current);
   window.addEventListener('resize',measure);measure();
   return()=>{observer.disconnect();window.removeEventListener('resize',measure);};
 },[]);
 // Keep the enlarged image's left edge inside the content column, clear of the leader rail.
 const rightOffset=placement.desktop?Math.max(24,(placement.artWidth*view.zoom-placement.width)/2+24):0;
 function update(zoom,x=view.x,y=view.y){const box=viewport.current?.getBoundingClientRect();setView(clampView(zoom,x,y,box?.width||0,box?.height||0));}
 function zoom(value){update(value);}
 function reset(){setView({zoom:initialZoom.current,x:0,y:0});setDragging(false);drag.current=null;}
 function down(e){if(view.zoom<=1||e.button!==0)return;e.currentTarget.setPointerCapture(e.pointerId);drag.current={id:e.pointerId,x:e.clientX,y:e.clientY,startX:view.x,startY:view.y};setDragging(true);}
 function move(e){if(!drag.current||drag.current.id!==e.pointerId)return;update(view.zoom,drag.current.startX+e.clientX-drag.current.x,drag.current.startY+e.clientY-drag.current.y);}
 function end(e){if(drag.current?.id!==e.pointerId)return;drag.current=null;setDragging(false);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}
 function key(e){const arrows={ArrowLeft:[35,0],ArrowRight:[-35,0],ArrowUp:[0,35],ArrowDown:[0,-35]};if(arrows[e.key]){e.preventDefault();e.stopPropagation();update(view.zoom,view.x+arrows[e.key][0],view.y+arrows[e.key][1]);}else if(e.key==='+'||e.key==='='){e.preventDefault();zoom(view.zoom+.25);}else if(e.key==='-'){e.preventDefault();zoom(view.zoom-.25);}else if(e.key==='0'){e.preventDefault();reset();}}
 return <div className="hos-art-viewer"><div ref={viewport} className={`hos-art-viewport ${dragging?'is-dragging':''}`} tabIndex={0} role="group" aria-label="Artwork explorer. Use plus and minus to zoom, arrow keys to pan, and zero to reset." onKeyDown={key} onPointerDown={down} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={()=>{drag.current=null;setDragging(false);}} style={{touchAction:view.zoom>1?'none':'pan-y',cursor:view.zoom>1?(dragging?'grabbing':'grab'):'default'}}><div ref={artwork} className="hos-art-transform" style={{transform:`translate(${view.x+rightOffset}px, ${view.y}px) scale(${view.zoom})`}}><img src={src} alt={alt} onLoad={imageLoaded} draggable={false}/></div></div><div className="hos-art-toolbar" role="group" aria-label="Artwork controls"><button onClick={()=>zoom(view.zoom-.25)} disabled={view.zoom<=1} aria-label="Zoom out">−</button><label><span className="sr-only">Zoom level</span><input type="range" min="1" max="4" step="0.05" value={view.zoom} onChange={e=>zoom(Number(e.target.value))}/></label><output aria-live="polite">{Math.round(view.zoom*100)}%</output><button onClick={()=>zoom(view.zoom+.25)} disabled={view.zoom>=4} aria-label="Zoom in">+</button><button onClick={reset}>Reset</button></div><p className="hos-art-hint">Zoom to explore · drag to move · arrow keys also work</p></div>;
}
