import {useContent} from '@/contexts/ContentContext';
import {Link} from 'react-router-dom';
import {portfolioProjects,artistIdentity} from '@/data/portfolios';
import ProjectCover from './ProjectCover';
export default function ExhibitionCards({projects}){
 const content=useContent(),items=projects||portfolioProjects(content);
 return <div className="project-grid">{items.map((project,i)=>{const artist=artistIdentity(content,project.artistId);return <article className="project-entry" key={project.id||project.slug}>
  <Link className="project-cover-link" to={`/exhibitions/${project.slug}`} aria-label={`Enter ${project.name}${project.release?`, ${project.release}`:''}`}><ProjectCover project={project} number={String(i+1)} image={project.slug==='metavase'?content?.settings?.ikaImage:''}/><span className="project-enter">Enter exhibition</span></Link>
  <div className="project-caption"><div><Link to={`/exhibitions/${project.slug}`}><h3>{project.name}</h3></Link><span>{project.medium||project.eyebrow}</span></div>{artist&&<Link className="project-artist" to={`/artists/${artist.id}`}>{artist.name}<span>Artist portfolio</span></Link>}</div>
 </article>})}</div>;
}
