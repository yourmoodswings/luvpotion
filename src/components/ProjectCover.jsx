export default function ProjectCover({project,number='01',image=''}){
 const vessel=project.slug==='metavase',source=image||project.hero;
 return <div className={`project-cover ${vessel?'project-cover-vessel':'project-cover-painting'} ${source?'has-image':''}`}>
  {source?<img className="project-cover-image" src={source} alt="" loading="lazy"/>:vessel?<div className="project-cover-form" aria-hidden="true"><i/><span/></div>:<div className="project-cover-empty" aria-hidden="true">{project.name?.slice(0,1)}</div>}
  <div className="project-cover-top"><span>LUVPOTION PRESENTS</span><span>{number.padStart(2,'0')}</span></div>
  <div className="project-cover-title"><span>{vessel?'METAVASE / VASE 1':project.release||project.medium||'EXHIBITION'}</span><h3>{vessel?'IKA':project.name}</h3><div className="project-cover-rule"/><span>{project.eyebrow||project.medium||'ART / STORIES / OBJECTS'}</span></div>
  {!source&&<span className="project-cover-note">{vessel?'FORM STUDY · PHOTOGRAPHY FORTHCOMING':'EXHIBITION COVER · ARTWORK FORTHCOMING'}</span>}
 </div>;
}
