import { Link } from 'react-router-dom';
export default function PurchaseSteps({step=0}){
 return <nav className="purchase-steps" aria-label="Order progress">{[['/cart','Your bag'],['/checkout','Your details'],[null,'Order saved']].map(([to,label],i)=><span key={label} aria-current={i===step?'step':undefined}>{to&&i<step?<Link to={to}><b>{i+1}</b>{label}</Link>:<span><b>{i+1}</b>{label}</span>}</span>)}</nav>;
}
