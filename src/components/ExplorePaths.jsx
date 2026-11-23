import {Link} from 'react-router-dom';
import Reveal from './Reveal';

const paths=[
 {to:'/exhibitions',image:'/assets/ika/paint-detail.webp',label:'Enter a story',title:'The exhibitions',copy:'Encounter art through its materials, memories, and meaning.'},
 {to:'/artists',image:'/assets/ika/aje.webp',label:'Meet the mind',title:'The artists',copy:'Discover the people and practices behind the work.'},
 {to:'/drops',image:'/assets/ika/front.webp',label:'Find your piece',title:'The objects',copy:'Explore sculptural works, editions, and objects to live with.'},
];
export default function ExplorePaths(){return <Reveal className="explore-paths"><div className="explore-paths-heading"><span className="ika-kicker">YOUR WAY INTO LUVPOTION</span><h2>A world to <em>get closer to.</em></h2></div><div className="explore-paths-grid">{paths.map(p=><Link to={p.to} key={p.to}><div className="explore-path-image"><img src={p.image} alt="" loading="lazy"/><span>{p.label}</span></div><h3>{p.title}</h3><p>{p.copy}</p></Link>)}</div></Reveal>}
