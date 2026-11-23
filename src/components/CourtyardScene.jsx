import {useEffect,useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {courtyardStops} from '@/data/courtyard';

export default function CourtyardScene({destination,onSelect,onReady,onError,reduced}){
 const host=useRef(null),engine=useRef(null),select=useRef(onSelect);
 select.current=onSelect;
 useEffect(()=>{
  const el=host.current;let renderer;
  try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});}catch{onError();return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;
  el.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label','Interactive courtyard. Tap the ground to move, drag to look around.');
  const scene=new THREE.Scene();scene.background=new THREE.Color('#eddfc8');scene.fog=new THREE.Fog('#eddfc8',24,55);
  const camera=new THREE.PerspectiveCamera(42,1,.1,80);camera.position.set(12,13,17);
  const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,0,0);controls.enableDamping=!reduced;controls.maxPolarAngle=Math.PI*.47;controls.minPolarAngle=.25;controls.minDistance=7;controls.maxDistance=36;controls.enablePan=false;
  if(el.clientWidth<650)camera.position.set(15,18,23);
  scene.add(new THREE.HemisphereLight('#fff3dc','#806d48',2.5));const sun=new THREE.DirectionalLight('#ffe3b5',3);sun.position.set(-7,15,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-14,right:14,top:14,bottom:-14});sun.shadow.bias=-.001;scene.add(sun);
  const materials=[],geometries=[],textures=[];const mat=c=>{const m=new THREE.MeshStandardMaterial({color:c,roughness:.9});materials.push(m);return m;};
  const plaster=mat('#c4a078'),wood=mat('#69472c'),stone=mat('#dfc9a4'),soil=mat('#ad8057'),leaf=mat('#667747'),darkleaf=mat('#405835'),terracotta=mat('#a76439');
  function mesh(g,m,x,y,z){geometries.push(g);const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;scene.add(o);return o;}
  function box(w,h,d,m,x,y,z){return mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z);}
  const ground=box(21,.25,20,soil,0,-.2,0);box(11,.05,2.5,stone,0,-.04,3);box(2.4,.05,12,stone,0,-.03,-1);
  // Architectural placeholders: an open veranda, workshop and courtyard walls.
  box(12,3.8,.3,plaster,0,1.8,-7);box(.3,2.4,9,plaster,-7,1,-2.5);
  box(11,.3,3.3,stone,0,.15,-5.3);box(11,.22,3.5,wood,0,3.4,-5.3);
  for(const x of [-5,-1,4.7])box(.17,3.3,.17,wood,x,1.7,-3.7);
  box(1.7,2.7,.08,wood,-3,1.3,-6.8);box(2.1,1.4,.08,wood,2,2,-6.8);
  for(let x=1.15;x<3;x+=.35)box(.08,1.3,.12,stone,x,2,-6.7);
  box(2.5,.16,1.3,wood,-4,1,0);for(const x of [-5,-3])for(const z of [-.45,.45])box(.1,1,.1,wood,x,.5,z);
  const plant=(x,z,s=1)=>{mesh(new THREE.CylinderGeometry(.45*s,.32*s,.65*s,12),terracotta,x,.32*s,z);mesh(new THREE.CylinderGeometry(.045*s,.075*s,1.6*s,6),wood,x,1.1*s,z);for(let i=0;i<6;i++){const a=i*2.4;const o=mesh(new THREE.SphereGeometry(.6*s,8,6),i%2?leaf:darkleaf,x+Math.sin(a)*.4*s,(1.4+i*.15)*s,z+Math.cos(a)*.4*s);o.scale.set(.8,.45,1.1);}};
  [[-6,4,1.6],[5,3,1.7],[5,-2,1.4],[-5,-3,1],[-2,5,1],[7,6,2],[-7,7,1.5],[7,-6,1.4]].forEach(p=>plant(...p));
  const targets=[];const loader=new THREE.TextureLoader();let alive=true;
  courtyardStops.forEach((stop,i)=>{const [x,z]=stop.position;box(1,.6,1,stone,x,.3,z);const tex=loader.load(stop.image,()=>{if(!alive)tex.dispose();},undefined,()=>{});tex.colorSpace=THREE.SRGBColorSpace;textures.push(tex);const m=new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide});materials.push(m);const picture=mesh(new THREE.PlaneGeometry(1.2,1.6),m,x,1.5,z);picture.userData.stop=i;targets.push(picture);const ring=mesh(new THREE.TorusGeometry(.67,.025,6,40),wood,x,.64,z);ring.rotation.x=Math.PI/2;});
  const avatar=new THREE.Group();const avatarMat=mat('#7b370f');const body=new THREE.Mesh(new THREE.CapsuleGeometry(.13,.28,4,8),avatarMat);geometries.push(body.geometry);body.position.y=.4;body.castShadow=true;avatar.add(body);scene.add(avatar);avatar.position.set(0,0,6);
  const target=new THREE.Vector3(0,0,6),keys=new Set(),ray=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null,frame,previous=performance.now();
  const go=(x,z)=>{target.set(THREE.MathUtils.clamp(x,-6,6),0,THREE.MathUtils.clamp(z,-3,7));};engine.current={go};
  const hit=e=>{const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);return ray;};
  const pointerDown=e=>{down=[e.clientX,e.clientY];};const pointerUp=e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>7)return;down=null;const cast=hit(e),art=cast.intersectObjects(targets)[0];if(art){select.current(art.object.userData.stop);return;}const floor=cast.intersectObject(ground)[0];if(floor)go(floor.point.x,floor.point.z);};
  const keydown=e=>{if(/INPUT|BUTTON|TEXTAREA|SELECT/.test(e.target.tagName))return;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(e.key)){e.preventDefault();keys.add(e.key);}};const keyup=e=>keys.delete(e.key);const blur=()=>keys.clear();
  renderer.domElement.addEventListener('pointerdown',pointerDown);renderer.domElement.addEventListener('pointerup',pointerUp);window.addEventListener('keydown',keydown);window.addEventListener('keyup',keyup);window.addEventListener('blur',blur);
  const resize=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};const observer=new ResizeObserver(resize);observer.observe(el);resize();
  const tick=now=>{const dt=Math.min((now-previous)/1000,.05);previous=now;if(keys.size){const dx=(keys.has('d')||keys.has('ArrowRight')?1:0)-(keys.has('a')||keys.has('ArrowLeft')?1:0),dz=(keys.has('s')||keys.has('ArrowDown')?1:0)-(keys.has('w')||keys.has('ArrowUp')?1:0);go(avatar.position.x+dx*.5,avatar.position.z+dz*.5);}
   const delta=target.clone().sub(avatar.position),distance=delta.length();if(distance>.02){delta.normalize().multiplyScalar(Math.min(distance,dt*2.8));avatar.position.add(delta);const desired=new THREE.Vector3(avatar.position.x*.5,0,avatar.position.z*.5);const shift=desired.sub(controls.target).multiplyScalar(reduced?1:.04);controls.target.add(shift);camera.position.add(shift);}
   controls.update();renderer.render(scene,camera);frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);onReady();
  return()=>{alive=false;cancelAnimationFrame(frame);observer.disconnect();controls.dispose();window.removeEventListener('keydown',keydown);window.removeEventListener('keyup',keyup);window.removeEventListener('blur',blur);renderer.domElement.removeEventListener('pointerdown',pointerDown);renderer.domElement.removeEventListener('pointerup',pointerUp);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove();engine.current=null;};
 },[onReady,onError,reduced]);
 useEffect(()=>{if(destination!=null){const s=courtyardStops[destination];engine.current?.go(s.position[0],s.position[1]+1.4);}},[destination]);
 return <div className="courtyard-canvas" ref={host}/>;
}
