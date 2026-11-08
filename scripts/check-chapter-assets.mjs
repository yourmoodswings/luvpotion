import fs from 'node:fs';
import { leaders } from '../src/data/leaders.js';
const aliases = { '/assets/exhibitions/obasanjo-mobile.png': '/assets/exhibitions/obansanjo-mobile.png', '/assets/exhibitions/babangida-mobile.png': '/assets/exhibitions/babangida.png' };
const art = leaders.map(l => {
 const candidates=[l.magazineContent.mobileArtImage,l.magazineContent.artImage].filter(Boolean).map(p=>aliases[p]||p);
 return candidates.find(p=>fs.existsSync(`public${p}`))||null;
});
fs.writeFileSync('src/data/chapterArt.js', `// Only artwork supplied in this project is presented as a chapter image.\nexport const chapterArt = ${JSON.stringify(art,null,2)};\n`);
