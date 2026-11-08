import { build } from 'esbuild';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import path from 'node:path';
const production=process.argv.includes('--production');
globalThis.sessionStorage = { getItem:()=>null, setItem:()=>{} };
await build({stdin:{contents:"export {default as App} from './src/App.jsx'; export {CartProvider} from './src/contexts/CartContext.jsx';",resolveDir:process.cwd()},bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic',alias:{'@':path.resolve('src')},loader:{'.css':'empty'},define:{'import.meta.env.DEV':production?'false':'true','import.meta.env.VITE_WP_BASE':'"https://luvpotion.co"'},outfile:'logs/route-check.mjs'});
const {App,CartProvider}=await import('../logs/route-check.mjs');
for (const route of ['/','/drops','/drops/test-object','/exhibitions','/exhibitions/metavase','/studio','/drops?collection=METAVASE','/exhibitions/heads-of-state','/exhibitions/heads-of-state#chapter-0','/exhibitions/heads-of-state#chapter-16','/exhibitions/heads-of-state#chapter-99','/artists','/artists/missing','/studio/artists','/studio/media?chapter=0','/drops?exhibition=heads-of-state','/cart','/checkout','/account','/orders/42','/auctions','/not-found']) {
 const html=renderToString(React.createElement(MemoryRouter,{initialEntries:[route]},React.createElement(CartProvider,null,React.createElement(App))));
 if(route==='/exhibitions/heads-of-state'&&!html.includes('THE INVESTIGATION BOARD'))throw new Error('Board not rendered');
 if(route.includes('#chapter-0')&&!html.includes('Abubakar Tafawa Balewa'))throw new Error('Chapter deep link failed');
 if(route.includes('#chapter-99')&&!html.includes('THE INVESTIGATION BOARD'))throw new Error('Invalid chapter must fall back to board');
 if(production&&html.includes('href="/studio'))throw new Error('Public studio link exposed');
 if(production&&route.startsWith('/studio')&&!html.includes('A little off the beaten path.'))throw new Error('Public studio route exposed');
 if(!html.includes('main-content')||!html.includes('LUVPOTION')) throw new Error(`Missing shared shell: ${route}`);
 console.log(`PASS render ${route} (${html.length} characters)`);
}
