import Reveal from './Reveal';
import './IkaSurface.css';
export default function IkaSurface(){return <Reveal className="ika-surface">
 <header><span className="ika-kicker">THE HAND LEAVES A TRACE</span><h2>You can see<br/><em>how it feels.</em></h2><p>Folded edges. Raised colour. Light catching every uneven surface. The character of IKA lives in these details.</p></header>
 <div className="ika-surface-studies"><figure><img src="/assets/ika/surface-folds.webp" alt="Close view of IKA’s uneven folded rim and textured turquoise finish" loading="lazy"/><figcaption><span>01 / THE FORM</span>Every fold holds its own shape.</figcaption></figure><figure><img src="/assets/ika/paint-detail.webp" alt="Close view of raised paint and a reading scene on the vase" loading="lazy"/><figcaption><span>02 / THE PAINT</span>A story, built up by hand.</figcaption></figure></div>
 <a className="ika-secondary" href="#inspect-vase">Inspect the surface up close</a>
 </Reveal>}
