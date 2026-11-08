import {useContent} from '@/contexts/ContentContext';
import ArtworkViewer from '@/components/ArtworkViewer';
import { shortPassage } from '@/lib/artworkView';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { storyChapters, chapterFromHash, storyBeats } from '@/data/storyArchive';
import { loadChapterMedia } from '@/lib/storyMedia';
import { getProducts, listArtists, money } from '@/lib/storeApi';
import './HeadsOfState.css';

function Board({ enter, chapters:storyChapters }) {
  const [selected,setSelected]=useState(0),[query,setQuery]=useState('');
  const chapter=storyChapters[selected];
  const [portrait,setPortrait]=useState('');
  useEffect(()=>{let active=true,url='';setPortrait('');loadChapterMedia(selected).then(m=>{if(active&&m.portrait){url=m.portrait.url||URL.createObjectURL(m.portrait.blob);setPortrait(url);}}).catch(()=>{});return()=>{active=false;if(url)URL.revokeObjectURL(url);};},[selected]);
  const matches=storyChapters.filter(c=>`${c.name} ${c.term}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="hos-board-page">
    <header className="hos-board-heading"><div><span className="hos-label">LUVPOTION / AN INTERACTIVE EXHIBITION</span><h1>HEADS<br/>OF <em>STATE.</em></h1></div><div><span className="hos-stamp">THE POWER ARCHIVE</span><p>Seventeen chapters. A history of power.<br/>Follow a face. Open a story. Look again.</p><button className="hos-button" onClick={()=>enter(0)}>Begin the exhibition <span>↗</span></button></div></header>
    <div className="hos-board-bar"><span><i/> THE INVESTIGATION BOARD</span><label><span className="sr-only">Find a leader or year</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a leader or year…"/></label><span>HOVER TO DISCOVER · TAP TO SELECT</span></div>
    <div className="hos-investigation"><div className="hos-board">
      {!query&&<svg className="hos-threads" viewBox="0 0 1000 690" preserveAspectRatio="none" aria-hidden="true"><path d="M82 95L248 95L415 95L582 95L748 95L915 95L82 325L248 325L415 325L582 325L748 325L915 325L82 555L248 555L415 555L582 555L748 555"/><path d="M82 95L582 325M415 95L248 555M915 95L82 555M748 325L582 555"/></svg>}
      {matches.map(c=><button key={c.id} className={`hos-file ${selected===c.index?'selected':''}`} style={{'--tilt':`${(c.index%3-1)*2}deg`}} onMouseEnter={()=>setSelected(c.index)} onFocus={()=>setSelected(c.index)} onClick={()=>setSelected(c.index)} onDoubleClick={()=>enter(c.index)} aria-pressed={selected===c.index} aria-label={`${c.name}, ${c.term}. Select story preview.`}><i className="hos-pin"/>{c.artwork?<img src={c.artwork} alt="" loading="lazy"/>:<div className="hos-file-initials">{c.initials}<small>PORTRAIT PENDING</small></div>}<span className="hos-file-code">FILE {c.number} / {c.term}</span><strong>{c.name}</strong></button>)}
      {!matches.length&&<p className="hos-no-results">No matching chapter. Try a different name or year.</p>}
    </div><aside className="hos-dossier" aria-label="Selected leader preview"><span className="hos-label">SELECTED FILE / {chapter.number}</span>{portrait&&<img className="hos-board-preview-photo" src={portrait} alt={chapter.name}/>}<h2>{chapter.name}</h2><span className="hos-period">{chapter.term}</span><p>{chapter.title}</p><blockquote>“{chapter.quote}”</blockquote><span className="hos-label">CURATORIAL STORY</span><p>{chapter.chapterTitle}</p><button className="hos-button" onClick={()=>enter(selected)}>Enter this chapter <span>↗</span></button><small>The lines suggest a journey through the archive. This is an artistic interpretation of history.</small></aside></div>
    <footer className="hos-board-footer"><span>01 / DISCOVER THE FIGURES</span><span>02 / ENTER THEIR STORIES</span><span>03 / MEET THE ARTISTS & COLLECT</span></footer>
  </section>;
}

export default function HeadsOfState(){
  const content=useContent();
  const chapters=storyChapters.map(c=>({...c,...content?.chapters?.find(x=>x.id===c.id)}));
  const location=useLocation(),navigate=useNavigate();
  const index=chapterFromHash(location.hash),chapter=chapters[index];
  const [panel,setPanel]=useState('artwork'),[beat,setBeat]=useState(0),[motion,setMotion]=useState(false),[sound,setSound]=useState(false),[message,setMessage]=useState(''),[media,setMedia]=useState({}),[products,setProducts]=useState([]),[artists,setArtists]=useState([]),[full,setFull]=useState(false);
  const ambient=useRef(null),narration=useRef(null),film=useRef(null),stage=useRef(null),heading=useRef(null);
  useEffect(()=>{setMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);},[]);
  useEffect(()=>{getProducts().then(setProducts).catch(e=>setMessage(e.message));listArtists().then(setArtists).catch(e=>setMessage(e.message));},[]);
  useEffect(()=>{
    setPanel('artwork');setBeat(0);setMessage('');setMedia({});setSound(false);
    ambient.current?.pause();narration.current?.pause();film.current?.pause();
    if(index<0)return;
    let cancelled=false;const urls=[];
    loadChapterMedia(index).then(records=>{if(cancelled)return;const next={};for(const [kind,record]of Object.entries(records)){next[kind]=record.url||URL.createObjectURL(record.blob);if(!record.url)urls.push(next[kind]);}setMedia(next);}).catch(()=>{if(!cancelled)setMessage('Attached chapter media could not be loaded. The artwork and written story remain available.');});
    heading.current?.focus({preventScroll:true});
    return()=>{cancelled=true;urls.forEach(url=>URL.revokeObjectURL(url));};
  },[index]);
  useEffect(()=>{if(panel!=='film')film.current?.pause();if(panel!=='story')narration.current?.pause();},[panel]);
  function enter(next){navigate(`#chapter-${next}`);window.scrollTo({top:0,behavior:'instant'});}
  function board(){navigate({pathname:location.pathname,hash:''});}
  useEffect(()=>{if(index<0)return;const handle=e=>{if(['INPUT','SELECT','TEXTAREA','VIDEO','AUDIO','BUTTON','A'].includes(e.target.tagName)||e.target.isContentEditable)return;if(e.key==='Escape'){if(!document.fullscreenElement)board();}if(e.key==='ArrowRight'&&index<storyChapters.length-1)enter(index+1);if(e.key==='ArrowLeft'&&index>0)enter(index-1);};window.addEventListener('keydown',handle);return()=>window.removeEventListener('keydown',handle);},[index]);
  useEffect(()=>{const sync=()=>setFull(!!document.fullscreenElement);document.addEventListener('fullscreenchange',sync);return()=>document.removeEventListener('fullscreenchange',sync);},[]);
  async function toggleSound(){if(sound){ambient.current?.pause();setSound(false);return;}try{film.current?.pause();narration.current?.pause();await ambient.current.play();setSound(true);setMessage('');}catch{setMessage('Ambient sound could not start. Try the sound control again.');}}
  async function toggleFull(){try{if(document.fullscreenElement)await document.exitFullscreen();else if(stage.current?.requestFullscreen)await stage.current.requestFullscreen();else setMessage('Fullscreen is unavailable in this browser.');}catch{setMessage('Fullscreen is unavailable in this browser.');}}
  if(index<0)return <Board enter={enter} chapters={chapters}/>;
  const beats=storyBeats(chapter);
  const related=products.filter(p=>p.collection==='heads-of-state'&&(p.chapterIndex==null||p.chapterIndex===index));
  const credited=artists.filter(a=>a.chapters?.includes(index)||related.some(p=>p.artistId===a.id));
  return <section ref={stage} className={`hos-cinema ${motion?'motion-on':''}`}>
    <audio ref={ambient} src="/audio/ambient.mp3" loop preload="none"/>
    <div className="hos-cinema-controls"><button onClick={board}>← Investigation board</button><span>HEADS OF STATE / FILE {chapter.number}</span><div><button onClick={toggleSound} aria-pressed={sound}>Sound {sound?'on ◉':'off ○'}</button><button onClick={()=>setMotion(!motion)} aria-pressed={motion}>Motion {motion?'on':'off'}</button><button onClick={toggleFull}>{full?'Exit fullscreen':'Fullscreen ⛶'}</button></div></div>
    <div className={`hos-scene ${panel==='artwork'?'hos-art-scene':''}`} key={index}>
      <div className="hos-scene-backdrop" aria-hidden="true" style={{backgroundImage:`url('${chapter.artwork||'/assets/hero-background.jpg'}')`}}/>
      <div className="hos-grain" aria-hidden="true"/>
      <div className="hos-scene-layout">
        <aside className="hos-chapter-rail"><span className="hos-label">THE CHAPTERS</span><label><span className="sr-only">Choose chapter</span><select value={index} onChange={e=>enter(Number(e.target.value))}>{storyChapters.map(c=><option key={c.id} value={c.index}>{c.number} / {c.name}</option>)}</select></label><div className="hos-rail-numbers">{storyChapters.map(c=><button key={c.id} onClick={()=>enter(c.index)} className={c.index===index?'active':''} aria-label={`Chapter ${c.number}: ${c.name}`} aria-current={c.index===index?'step':undefined}>{c.number}</button>)}</div><Link to="/exhibitions">All exhibitions ↗</Link></aside>
        <div className="hos-main-scene">
          <header className="hos-chapter-heading">{media.portrait&&<img className="hos-chapter-portrait" src={media.portrait} alt={chapter.name}/>}<span className="hos-label">{chapter.term} / {chapter.title}</span><h1 ref={heading} tabIndex={-1}>{chapter.name}</h1><p>{chapter.chapterTitle}</p></header>
          <div className="hos-scene-tabs" role="group" aria-label="Chapter views">{[['story','The story'],['artwork','The artwork'],['film','Film & sound'],['collect','Artist & collect']].map(([key,label])=><button key={key} aria-pressed={panel===key} onClick={()=>setPanel(key)}>{label}</button>)}</div>
          {panel==='story'&&<div className="hos-story-panel" key={`${index}-${beat}`}><span className="hos-label">CURATORIAL INTERPRETATION / {beat+1} OF {beats.length}</span><blockquote>“{chapter.quote}”</blockquote><p>{shortPassage(beats[beat])}</p><div className="hos-beats">{beats.map((_,i)=><button key={i} onClick={()=>setBeat(i)} aria-pressed={i===beat} aria-label={`Read story passage ${i+1}`}><span/></button>)}</div><div className="hos-story-actions">{beat<beats.length-1?<button className="hos-button" onClick={()=>setBeat(beat+1)}>Continue the story →</button>:<button className="hos-button" onClick={()=>setPanel('artwork')}>Look into the artwork ↗</button>}<details><summary>Read the full chapter</summary><p>{chapter.narrative}</p><ul>{chapter.highlights.map(h=><li key={h}>{h}</li>)}</ul></details></div></div>}
          {panel==='artwork'&&<div className="hos-art-panel">{chapter.artwork?<ArtworkViewer key={chapter.id} src={chapter.artwork} alt={`Artwork interpreting ${chapter.name}`}/>:<div className="hos-missing-art"><span>{chapter.initials}</span><h2>Artwork being prepared</h2><p>The written chapter is available while this piece is added.</p></div>}<div><span className="hos-label">TAKE A CLOSER LOOK</span><h2>{chapter.chapterTitle}</h2><p>{shortPassage(chapter.quote,24)}</p><p className="hos-credit">{credited.length?`Artist: ${credited.map(a=>a.name).join(', ')}`:'Artist credit awaiting confirmation.'}</p><button className="hos-button" onClick={()=>setPanel('collect')}>Explore related objects ↗</button></div></div>}
          {panel==='film'&&<div className="hos-film-panel">{media.film?<video ref={film} controls playsInline preload="metadata" poster={chapter.artwork||undefined} onPlay={()=>{ambient.current?.pause();narration.current?.pause();setSound(false);}} onError={()=>setMessage('This film could not play. Try an MP4 or WebM file with a browser-supported codec.')}><source src={media.film}/>{media.captions&&<track kind="captions" src={media.captions} srcLang="en" label="English" default/>}</video>:<div className="hos-film-placeholder">{chapter.artwork&&<img src={chapter.artwork} alt="Animated still artwork placeholder"/>}<div><span className="hos-label">ARTWORK MOTION STUDY / PLACEHOLDER</span><h2>Chapter film</h2><p>Portrait film coming soon. Animated artwork preview.</p></div></div>}{media.narration?<div className="hos-narration"><label>Chapter voiceover</label><audio ref={narration} controls preload="metadata" src={media.narration} onPlay={()=>{ambient.current?.pause();film.current?.pause();setSound(false);}}/></div>:<p className="hos-credit">Ambient sound available · voiceover pending.</p>}{import.meta.env.DEV && <Link className="hos-text-link" to={`/studio/media?chapter=${index}`}>Add chapter media ↗</Link>}</div>}
          {panel==='collect'&&<div className="hos-collect-panel"><div><span className="hos-label">THE HAND BEHIND THE WORK</span>{credited.length?credited.map(a=><Link key={a.id} className="hos-artist-credit" to={`/artists/${a.id}`}><strong>{a.name}</strong><span>{a.discipline} ↗</span></Link>):<><h2>Art has an author.</h2><p>Artist attribution for this chapter is being prepared. Credits and profiles will appear here when supplied.</p><Link className="hos-text-link" to="/artists">Explore the artists section ↗</Link></>}</div><div><span className="hos-label">TAKE THE STORY INTO YOUR WORLD</span>{related.length?<div className="hos-related">{related.map(p=><Link to={`/drops/${p.slug}`} key={p.id}>{p.images[0]&&<img src={p.images[0].src} alt=""/>}<strong>{p.name}</strong><span>{p.pending?'Details coming soon':p.saleMode==='auction'?'Auction lot ↗':money(p.prices.price,p.prices)}</span></Link>)}</div>:<><h2>Paintings. Vases. Objects.</h2><p>Related pieces will be listed here when their details are ready.</p></>}<Link className="hos-text-link" to="/drops?exhibition=heads-of-state">Explore the Heads of State collection ↗</Link></div></div>}
          {message&&<p className="hos-media-message" role="status">{message}</p>}
        </div>
      </div>
    </div>
    <footer className="hos-cinema-footer"><button disabled={index===0} onClick={()=>enter(index-1)}>← Previous chapter</button><span>{chapter.number} / {storyChapters.length} <i style={{'--progress':`${(index+1)/storyChapters.length*100}%`}}/></span>{index<storyChapters.length-1?<button onClick={()=>enter(index+1)}>Next chapter →</button>:<button onClick={board}>Return to the board ↗</button>}</footer>
  </section>;
}
