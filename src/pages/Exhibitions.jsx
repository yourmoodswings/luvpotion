import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useContent} from '@/contexts/ContentContext';
import {portfolioProjects} from '@/data/portfolios';
import ExhibitionCards from '@/components/ExhibitionCards';
export default function Exhibitions(){
 const content=useContent(),projects=portfolioProjects(content),[medium,setMedium]=useState('All');
 const media=['All',...new Set(projects.map(p=>p.medium).filter(Boolean))];
 const visible=projects.filter(p=>medium==='All'||p.medium===medium);
 return <div className="exhibition-index"><header className="portfolio-heading"><span className="folio-label">LUVPOTION / EXHIBITIONS</span><div><h1>Enter a<br/>different world.</h1><p>Art, in its own atmosphere.</p></div></header><div className="project-index-toolbar"><div role="group" aria-label="Filter exhibitions by medium">{media.map(m=><button key={m} onClick={()=>setMedium(m)} aria-pressed={medium===m}>{m}</button>)}</div><span aria-live="polite">{visible.length} {visible.length===1?'exhibition':'exhibitions'}</span></div><section className="exhibition-index-projects" aria-label="Exhibitions"><ExhibitionCards projects={visible}/>{!visible.length&&<p>No exhibitions in this medium yet.</p>}</section><footer className="folio-end"><span>The work. The person behind it.</span><Link to="/artists">Meet the artists</Link></footer></div>;
}
