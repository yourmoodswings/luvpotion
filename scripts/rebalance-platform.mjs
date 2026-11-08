import fs from 'node:fs';
const path='src/pages/Drops.jsx';let s=fs.readFileSync(path,'utf8');
const start=s.indexOf('<div className="mv-shop-callout">');const end=s.indexOf('<section className="lp-shop">',start);
if(start<0||end<0)throw new Error('Shop banner boundaries not found');
s=s.slice(0,start)+s.slice(end);
s=s.replace('METAVASE · Painted flower vases, expected from ₦200,000. Individual prices and availability to be confirmed. Other categories contain sample inventory. Local checkout saves unpaid orders.',"{category==='METAVASE'?'METAVASE · Painted flower vases, expected from ₦200,000. Individual prices and availability to be confirmed.':'Explore the full LUVPOTION collection. Starter items are labeled as samples; METAVASE piece details are being prepared.'} Local checkout saves unpaid orders.");
s=s.replace('<div className="lp-shop-tools">','<nav className="platform-shop-nav" aria-label="Shop departments">{categories.map(c=><Link key={c} to={c===\'All objects\'?\'/drops\':`/drops?collection=${encodeURIComponent(c)}`} aria-current={c===category?\'page\':undefined}>{c}</Link>)}</nav>{category===\'METAVASE\'&&<Link className="lp-link" to="/exhibitions/metavase">Explore the METAVASE exhibition ↗</Link>}<div className="lp-shop-tools">');
fs.writeFileSync(path,s);
let shell=fs.readFileSync('src/components/SiteLayout.jsx','utf8').replace('<NavLink to="/exhibitions">Exhibitions</NavLink>','<NavLink to="/" end>Home</NavLink><NavLink to="/exhibitions">Exhibitions</NavLink>').replace('<NavLink to="/drops">Objects & editions</NavLink>','<NavLink to="/drops">Shop</NavLink>');fs.writeFileSync('src/components/SiteLayout.jsx',shell);
