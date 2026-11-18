import ProductCard from '@/components/ProductCard';
import ArtworkViewer from '@/components/ArtworkViewer';
import ExhibitionCards from '@/components/ExhibitionCards';
import {useContent} from '@/contexts/ContentContext';
import {useEffect,useRef,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import {listArtists,getProducts} from '@/lib/storeApi';
import {StatePanel} from '@/components/PageParts';
import {storyChapters} from '@/data/storyArchive';
import {foundingArtist,portfolioProjects} from '@/data/portfolios';

export default function Artists(){const content=useContent();return <CreativePortfolio id={content?.settings?.foundingArtistId||'the-maker'}/>;}
export function ArtistProfile(){const {id}=useParams();return <CreativePortfolio key={id} id={id}/>;}
function WorkDialog({work,onClose}){
 const dialog=useRef(null);
 useEffect(()=>{const el=dialog.current;if(!el.open)el.showModal();return()=>{if(el.open)el.close();};},[]);
 return <dialog ref={dialog} aria-label={`Artwork: ${work.name}`} className="portfolio-work-dialog" onClose={onClose} onClick={e=>{if(e.target===dialog.current)dialog.current.close();}}><div className="portfolio-dialog-header"><span>{work.name}</span><button onClick={()=>dialog.current.close()} autoFocus aria-label="Close artwork">Close</button></div><ArtworkViewer src={work.artwork} alt={`Heads of State artwork interpreting ${work.name}`}/><div className="portfolio-dialog-caption"><h2>{work.chapterTitle}</h2><Link to={`/exhibitions/heads-of-state#chapter-${work.index}`}>Enter the story</Link></div></dialog>;
}
function CreativePortfolio({id}){
 const content=useContent(),isFounder=id===(content?.settings?.foundingArtistId||'the-maker');
 const [artists,setArtists]=useState([]),[pieces,setPieces]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[work,setWork]=useState(null),[practice,setPractice]=useState('painting');
 useEffect(()=>{let active=true;setLoading(true);setError('');Promise.all([listArtists(),getProducts()]).then(([a,p])=>{if(active){setArtists(a);setPieces(p);}}).catch(e=>{if(active)setError(e.message);}).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[id]);
 const artist=artists.find(a=>a.id===id)||(isFounder?foundingArtist:null);
 const projects=portfolioProjects(content).filter(p=>p.artistId===id);
 const chapters=storyChapters.map(c=>({...c,...content?.chapters?.find(x=>x.id===c.id)}));
 const hasArchive=projects.some(p=>p.slug==='heads-of-state');
 const works=chapters.filter(c=>c.artwork&&(isFounder?hasArchive:artist?.chapters?.includes(c.index))).filter((c,i,a)=>a.findIndex(x=>x.artwork===c.artwork)===i);
 const objects=pieces.filter(p=>p.artistId===id||(!p.artistId&&isFounder&&!p.sample&&projects.some(e=>e.slug===p.collection)));
 const others=artists.filter(a=>a.id!==id);
 if(!artist){if(loading)return <StatePanel title="Opening the artist’s portfolio…"/>;return <StatePanel title="Artist profile not available.">{error}<Link to="/artists">Back to artists</Link></StatePanel>;}
 const practiceCopy={painting:['Image & memory','Nigeria’s leaders become subjects for painting, satire, and historical storytelling.','/exhibitions/heads-of-state','Enter Heads of State'],film:['A director’s way of seeing','Film is part of the practice: framing a scene, building atmosphere, and finding the story within an image.','/artists/the-maker/practice?scene=maker','Explore the practice'],making:['Built by hand','Off-road trucks, painted surfaces, cloth, and cement. Making is a way of thinking, carried into METAVASE and VASE 1.','/exhibitions/metavase','Discover VASE 1']};
 const current=practiceCopy[practice];
 return <div className="creative-portfolio">
  <header className="portfolio-heading artist-portfolio-heading"><span className="folio-label">LUVPOTION / ARTIST PORTFOLIO</span><div><h1>{artist.name}</h1><p>{artist.discipline}</p></div><nav aria-label="Artist portfolio sections"><a href="#selected-projects">Projects</a>{works.length>0&&<a href="#selected-works">Works</a>}<a href="#artist-practice">Practice</a><a href="#artist-objects">Objects</a></nav></header>
  <div className="portfolio-frontispiece">{artist.photo?<img src={artist.photo} alt={artist.name}/>:works.length?<><img src={works[0]?.artwork||'/assets/exhibitions/tafawa-mobile.png'} alt="Painting from Heads of State"/><img src={works[3]?.artwork||works[1]?.artwork||works[0]?.artwork} alt="Another work from the Heads of State series"/></>:<div className="portfolio-monogram" aria-hidden="true">{artist.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>}<div><span>{artist.photo?'THE ARTIST':works.length?'FROM THE ARTIST’S WORK':'ARTIST PORTFOLIO'}</span><p>{isFounder?'Image. Form. Memory.':artist.discipline}</p></div></div>
  <section id="selected-projects" className="portfolio-section"><div className="folio-section-heading"><div><span className="folio-label">BODIES OF WORK</span><h2>Selected projects</h2></div><span>{String(projects.length).padStart(2,'0')}</span></div>{projects.length?<ExhibitionCards projects={projects}/>:<p>Exhibitions will appear here as they are published.</p>}</section>
  {works.length>0&&<section id="selected-works" className="portfolio-section portfolio-works-section"><div className="folio-section-heading"><div><span className="folio-label">A CLOSER LOOK</span><h2>From the archive</h2></div><span>Tap a work to inspect</span></div><div className="portfolio-work-grid">{works.slice(0,6).map(c=><button className="portfolio-work" key={c.id} onClick={()=>setWork(c)}><div><img src={c.artwork} alt={`Artwork interpreting ${c.name}`} loading="lazy"/></div><span>{c.name}</span><small>Heads of State / {c.number}</small></button>)}</div></section>}
  <section id="artist-practice" className="portfolio-section portfolio-practice"><div><span className="folio-label">ABOUT THE PRACTICE</span><h2>{isFounder?<>A builder’s hands.<br/>A storyteller’s eye.</>:artist.name}</h2><p>{artist.bio}</p></div>{isFounder&&<div className="practice-notebook"><div className="portfolio-practice-tabs" role="group" aria-label="Creative disciplines">{['painting','film','making'].map(p=><button key={p} aria-pressed={practice===p} onClick={()=>setPractice(p)}>{p}</button>)}</div><div className="practice-note" aria-live="polite"><span className="practice-number">{practice==='painting'?'01':practice==='film'?'02':'03'}</span><h3>{current[0]}</h3><p>{current[1]}</p>{practice==='film'&&<small>Original films will be added to the portfolio when supplied.</small>}<Link to={current[2]}>{current[3]}</Link></div></div>}</section>
  <section id="artist-objects" className="portfolio-section"><div className="folio-section-heading"><div><span className="folio-label">BEYOND THE EXHIBITION</span><h2>Objects & editions</h2></div><Link to="/drops">Visit the shop</Link></div>{error&&<p role="alert">{error}</p>}{objects.length?<div className="lp-product-grid">{objects.map(p=><ProductCard product={p} key={p.id}/>)}</div>:<p className="folio-empty">{loading?'Gathering the collection…':'Works, objects, and artist merchandise will appear here as they are released.'}</p>}</section>
  {others.length>0&&<section className="portfolio-section portfolio-other-artists"><div className="folio-section-heading"><h2>More artists on LUVPOTION</h2></div>{others.map(a=><Link to={`/artists/${a.id}`} key={a.id}><span>{a.name}</span><small>{a.discipline}</small><span>View portfolio</span></Link>)}</section>}
  <footer className="folio-end"><span>Continue into the work.</span><Link to="/exhibitions">Explore the exhibitions</Link></footer>
  {work&&<WorkDialog work={work} onClose={()=>setWork(null)}/>}
 </div>;
}
