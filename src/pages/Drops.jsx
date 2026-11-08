import { filterProducts } from '@/lib/catalogQueries';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts, plainText } from '@/lib/storeApi';
import { StatePanel } from '@/components/PageParts';
import ProductCard from '@/components/ProductCard';
export default function Drops() {
 const [params,setParams]=useSearchParams();
 const [filtersOpen,setFiltersOpen]=useState(true);
 useEffect(()=>{
  const mobile=window.matchMedia('(max-width: 650px)');
  const sync=()=>setFiltersOpen(!mobile.matches);
  sync();mobile.addEventListener('change',sync);
  return()=>mobile.removeEventListener('change',sync);
 },[]);
 const [products,setProducts]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState('');
 const query=params.get('q')||'',category=params.get('collection')||'All objects',sort=params.get('sort')||'Featured',exhibition=params.get('exhibition')||'all',format=params.get('format')||'all',available=params.get('available')==='1';
 async function load(){setLoading(true);setError('');try{const items=await getProducts();if(!Array.isArray(items))throw new Error();setProducts(items);}catch{setError('Your saved collection could not be read. Please check browser storage and try again.');}finally{setLoading(false);}}
 useEffect(()=>{load();},[]);
 const categories=['All objects',...new Set(products.flatMap(p=>(p.categories||[]).map(c=>plainText(c.name))))];
 function filter(key,value,replace=false){const next=new URLSearchParams(params);if(!value||value==='all'||value==='All objects'||value==='Featured')next.delete(key);else next.set(key,value);setParams(next,{replace});}
 const visible=useMemo(()=>filterProducts(products,{query,category,exhibition,format,sort}).filter(p=>!available||(!p.pending&&p.is_in_stock)),[products,query,category,exhibition,format,sort,available]);
 const active=[['q',query],['collection',category!=='All objects'?category:''],['exhibition',exhibition!=='all'?(exhibition==='metavase'?'METAVASE':'Heads of State'):''],['format',format!=='all'?(format==='auction'?'Auction':'Fixed price'):''],['available',available?'Available now':'']].filter(([,value])=>value);
 return <>
 <header className="collection-intro"><div><span className="lp-eyebrow">LUVPOTION / THE OBJECT LIBRARY</span><h1>Live with<br/><em>something meaningful.</em></h1><p>Art, found objects, and things for everyday life. Choose what speaks to you.</p></div><Link to="/exhibitions/metavase" className="collection-feature"><img src="/assets/shop/vase.svg" alt="Illustrated vessel study; METAVASE photographs forthcoming"/><div><span className="lp-eyebrow">EXHIBITION COLLECTION</span><h2>METAVASE</h2><p>Painting, in another dimension.</p><span>Discover the series ↗</span></div></Link></header>
 <div className="collection-disclosure"><span className="status-dot"/>LOCAL COLLECTION PREVIEW <span>Sample items are labeled. Checkout saves an unpaid order on this device.</span></div>
 <section className="collection-layout" aria-label="Shop collection">
 <aside className="collection-sidebar"><details open={filtersOpen} onToggle={e=>setFiltersOpen(e.currentTarget.open)}><summary>Browse & filter <span aria-hidden="true">{filtersOpen?'−':'＋'}</span></summary><nav aria-label="Shop departments">{categories.map(c=><button key={c} aria-pressed={c===category} onClick={()=>filter('collection',c)}><span>{c}</span><small>{c==='All objects'?products.length:products.filter(p=>p.categories?.some(cat=>plainText(cat.name)===c)).length}</small></button>)}</nav><label>Exhibition<select value={exhibition} onChange={e=>filter('exhibition',e.target.value)}><option value="all">All exhibitions</option><option value="heads-of-state">Heads of State</option><option value="metavase">METAVASE</option></select></label><label>Sale format<select value={format} onChange={e=>filter('format',e.target.value)}><option value="all">All formats</option><option value="fixed">Fixed price</option><option value="auction">Auction</option></select></label><label className="collection-check"><input type="checkbox" checked={available} onChange={e=>filter('available',e.target.checked?'1':'')}/> Available now</label></details><Link className="collection-story-link" to="/exhibitions"><span className="lp-eyebrow">BEHIND THE OBJECTS</span><p>Every collection<br/>begins with a story.</p><span>Enter the exhibitions ↗</span></Link></aside>
 <div className="collection-results"><div className="collection-toolbar"><label className="collection-search"><span className="sr-only">Search objects and artists</span><input type="search" placeholder="Search objects, artists, stories…" value={query} onChange={e=>filter('q',e.target.value,true)}/></label><label><span className="sr-only">Sort objects</span><select value={sort} onChange={e=>filter('sort',e.target.value)}>{['Featured','Price: low to high','Price: high to low'].map(s=><option key={s}>{s}</option>)}</select></label></div><div className="collection-result-bar"><p role="status">{loading?'Gathering the collection…':`${visible.length} ${visible.length===1?'object':'objects'}`}</p>{active.length>0&&<button onClick={()=>setParams({})}>Clear filters ×</button>}</div>{active.length>0&&<div className="collection-chips">{active.map(([key,value])=><button key={key} aria-label={`Remove ${value} filter`} onClick={()=>filter(key,'')}>{value} <span>×</span></button>)}</div>}
 {loading?<div className="lp-product-grid" aria-busy="true" aria-label="Loading objects">{[1,2,3,4,5,6].map(n=><div className="lp-skeleton" key={n}><div/><p>Loading object…</p></div>)}</div>:error?<StatePanel title="The collection is taking a moment." retry={load}>{error}</StatePanel>:!visible.length?<div className="collection-empty"><span aria-hidden="true">↗</span><h2>A different direction?</h2><p>No objects match these filters. Explore the full collection to find your next piece.</p><button className="lp-button" onClick={()=>setParams({})}>View all objects</button></div>:<div className="lp-product-grid">{visible.map(p=><ProductCard product={p} key={p.id}/>)}</div>}
 </div></section><section className="collection-end"><span className="lp-eyebrow">ART IS ONLY THE BEGINNING</span><h2>Go deeper into <em>the story.</em></h2><Link className="lp-button" to="/exhibitions/heads-of-state">Explore Heads of State ↗</Link></section></>;
}
