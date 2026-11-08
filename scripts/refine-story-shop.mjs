import fs from 'node:fs';
let s=fs.readFileSync('src/pages/Drops.jsx','utf8');s="import { filterProducts } from '@/lib/catalogQueries';\n"+s;
const start=s.indexOf('  const visible=useMemo'),end=s.indexOf('  return <>',start);
s=s.slice(0,start)+"  const visible=useMemo(()=>filterProducts(products,{query,category,exhibition,format,sort}),[products,query,category,exhibition,format,sort]);\n"+s.slice(end);fs.writeFileSync('src/pages/Drops.jsx',s);
s=fs.readFileSync('src/pages/Metavase.jsx','utf8').replaceAll('/drops?collection=METAVASE','/drops?exhibition=metavase');fs.writeFileSync('src/pages/Metavase.jsx',s);
s=fs.readFileSync('scripts/verify-story-platform.mjs','utf8').replace("import assert from 'node:assert/strict';","import assert from 'node:assert/strict';\nimport { filterProducts } from '../src/lib/catalogQueries.js';");
s=s.replace("await assert.rejects(api.addItem(painting.id),/auction room/);","const available=await api.getProducts();\nassert.ok(filterProducts(available,{exhibition:'heads-of-state',category:'Vases'}).some(p=>p.id===fixed.id));\nassert.deepEqual(filterProducts(available,{exhibition:'heads-of-state',format:'auction'}).map(p=>p.id),[painting.id]);\nassert.ok(filterProducts(available,{query:'Updated artist'}).some(p=>p.id===fixed.id));\nassert.equal(filterProducts(available,{sort:'Price: low to high'}).at(-1).pending,true);\nawait assert.rejects(api.addItem(painting.id),/auction room/);");
fs.writeFileSync('scripts/verify-story-platform.mjs',s);
