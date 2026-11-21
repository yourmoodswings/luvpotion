import {motion,useReducedMotion} from 'framer-motion';
import { Link } from 'react-router-dom';
import { money, plainText } from '@/lib/storeApi';
const MotionLink=motion.create(Link);
export default function ProductCard({product:p}) {
 const reduced=useReducedMotion();
 const category=plainText(p.categories?.[0]?.name||'Object');
 return <MotionLink whileHover={reduced?{}:{y:-4}} whileTap={reduced?{}:{scale:.985}} transition={{duration:.25}} className="lp-product-card" to={`/drops/${p.slug}`}>
  <div className="lp-product-image">{p.images?.[0]?.src?<img src={p.images[0].src} alt={p.images[0].alt||plainText(p.name)} loading="lazy"/>:<div className="object-pending"><span aria-hidden="true">◯</span><span>In the making</span><small>Photography forthcoming</small></div>}<span className="object-badge">{p.pending?'Coming soon':p.sample?'Sample edition':p.saleMode==='auction'?'Auction':'Collection piece'}</span><span className="lp-product-view" aria-hidden="true"></span></div>
  <div className="lp-product-meta"><span>{category}</span><span>{p.pending?'In preparation':!p.is_in_stock?'Sold out':p.saleMode==='auction'?'Bid to collect':'Available'}</span></div>
  <h2>{plainText(p.name)}</h2>{p.artistName&&<span className="object-artist">By {p.artistName}</span>}
  <p>{p.pending?'Price forthcoming':`${p.saleMode==='auction'?'From ':''}${money(p.prices?.price,p.prices)}`}</p>
 </MotionLink>;
}
