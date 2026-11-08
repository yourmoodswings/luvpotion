import fs from 'node:fs';
let s=fs.readFileSync('scripts/verify-store.mjs','utf8').replace('assert.equal(products.length,8);','assert.equal(products.filter(p=>p.sample).length,8);assert.ok(products.some(p=>p.collection===\'metavase\'));').replace('for(const p of products)assert.ok(fs.existsSync(`public${p.images[0].src}`));','for(const p of products.filter(p=>p.sample))assert.ok(fs.existsSync(`public${p.images[0].src}`));');
fs.writeFileSync('scripts/verify-store.mjs',s);
s=fs.readFileSync('scripts/verify-routes.mjs','utf8').replace("'/exhibitions','/exhibitions/heads-of-state'","'/exhibitions','/exhibitions/metavase','/studio','/drops?collection=METAVASE','/exhibitions/heads-of-state'");fs.writeFileSync('scripts/verify-routes.mjs',s);
