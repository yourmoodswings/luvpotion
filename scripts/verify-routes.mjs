import { build } from 'esbuild';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import path from 'node:path';
const production=process.argv.includes('--production');
globalThis.sessionStorage = { getItem:()=>null, setItem:()=>{} };
await build({stdin:{contents:"export {default as App} from './src/App.jsx'; export {CartProvider} from './src/contexts/CartContext.jsx';",resolveDir:process.cwd()},bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic',alias:{'@':path.resolve('src')},loader:{'.css':'empty'},define:{'import.meta.env.DEV':production?'false':'true','import.meta.env.VITE_WP_BASE':'"https://luvpotion.co"'},outfile:'logs/route-check.mjs'});
const {App,CartProvider}=await import('../logs/route-check.mjs');
for (const route of ['/','/discover?scene=collect','/?scene=maker','/?scene=power','/?scene=vessel','/?scene=collect','/artists/the-maker','/artists/the-maker/practice','/drops','/drops/test-object','/exhibitions','/exhibitions/metavase','/exhibitions/metavase/courtyard','/studio','/drops?collection=METAVASE','/exhibitions/heads-of-state','/exhibitions/heads-of-state?journey=guided','/exhibitions/heads-of-state?journey=guided#chapter-0','/exhibitions/heads-of-state#chapter-0','/exhibitions/heads-of-state#chapter-16','/exhibitions/heads-of-state#chapter-99','/artists','/artists/missing','/studio/artists','/studio/media?chapter=0','/drops?exhibition=heads-of-state','/cart','/checkout','/account','/orders/42','/auctions','/not-found']) {
 const html=renderToString(React.createElement(MemoryRouter,{initialEntries:[route]},React.createElement(CartProvider,null,React.createElement(App))));
 if(route==='/'&&(!html.includes('Culture you')||!html.includes('Enter METAVASE')))throw new Error('Brand and IKA launch missing');
 if(route==='/exhibitions/metavase'&&(!html.includes('IKA photographic story')||!html.includes('/assets/ika/surface-folds.webp')||html.includes('ika-formation.mp4')||html.includes('<model-viewer')))throw new Error('Document-based IKA exhibition missing or reconstructed media exposed');
 if(!route.includes('/studio')&&html.includes('href="/exhibitions/heads-of-state'))throw new Error('Archived exhibition exposed');
 if(route==='/artists'&&!html.includes('ARTIST PORTFOLIO'))throw new Error('Artist tab must open the full portfolio');
 if(route==='/exhibitions'&&(!html.includes('project-cover')||!html.includes('Filter exhibitions by medium')))throw new Error('Gallery presentation missing');
 if(production&&html.includes('href="/studio'))throw new Error('Public studio link exposed');
 if(production&&route.startsWith('/studio')&&!html.includes('A little off the beaten path.'))throw new Error('Public studio route exposed');
 if(!html.includes('main-content')||!html.includes('LUVPOTION')) throw new Error(`Missing shared shell: ${route}`);
 console.log(`PASS render ${route} (${html.length} characters)`);
}
