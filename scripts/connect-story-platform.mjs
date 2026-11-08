import fs from 'node:fs';
const p='src/lib/storeApi.js';let s=fs.readFileSync(p,'utf8');
s=s.replace(" if(existing&&existing.collection!=='metavase')throw new Error('Only METAVASE pieces can be edited here.');",'');
s=s.replace(" if(input.photo&&!/^data:image", " if(input.photo&&!input.photo.startsWith('/assets/')&&!/^data:image");
s=s.replace(" const id=existing?.id||Date.now();", " const id=existing?.id||Date.now();\n const collection=input.collection||existing?.collection||'metavase';\n const category=input.category||existing?.categories?.[0]?.name||(collection==='metavase'?'METAVASE':'Art & prints');\n const saleMode=input.saleMode||existing?.saleMode||'fixed';\n const chapterIndex=input.chapterIndex===''||input.chapterIndex==null?null:Number(input.chapterIndex);\n if(chapterIndex!==null&&(!Number.isInteger(chapterIndex)||chapterIndex<0||chapterIndex>16))throw new Error('Choose a valid story chapter.');\n if(input.artistId&&!(data.artists||[]).some(a=>a.id===input.artistId))throw new Error('Choose an existing artist.');\n if(saleMode==='auction'&&stock>1)throw new Error('Auction lots must have one available original.');");
s=s.replace("slug:existing?.slug||('metavase-'+id),name,collection:'metavase'", "slug:existing?.slug||('object-'+id),name,collection,saleMode,chapterIndex,artistId:input.artistId||'',condition:input.condition||'',edition:input.edition||'',care:input.care||'',shipping:input.shipping||'',artistName:(data.artists||[]).find(a=>a.id===input.artistId)?.name||''");
s=s.replace('stock:stock+reserved,sizes:[]','stock:stock+reserved,sizes:input.sizes?input.sizes.split(\',\').map(s=>s.trim()).filter(Boolean):existing?.sizes||[]');
s=s.replace("categories:[{name:'METAVASE'}]",'categories:[{name:category}]');
s=s.replaceAll("input.description||'Painted artwork on a handcrafted or molded flower vase.'","input.description||'Object details are being prepared.'");
s=s.replace("export async function exportInventory(){return inventory(read()).filter(p=>p.collection==='metavase');}","export async function exportInventory(){return inventory(read());}");
s=s.replace("if(p.pending||p.prices.price==null)throw", "if(p.saleMode==='auction')throw new Error('This painting is offered through the auction room.');if(p.pending||p.prices.price==null)throw");
s=s.replace('if(!p||p.pending||p.prices.price==null||','if(!p||p.saleMode===\'auction\'||p.pending||p.prices.price==null||');
s+=`
export async function listArtists(){return read().artists||[];}
export async function getArtist(id){return (await listArtists()).find(a=>a.id===id);}
export async function saveArtist(input){
 const data=read(),name=String(input.name||'').trim();
 if(!name||!String(input.bio||'').trim())throw new Error('Add the artist name and biography.');
 if(input.photo&&!/^data:image\\/(jpeg|png|webp);base64,/.test(input.photo))throw new Error('Use a JPG, PNG or WebP portrait.');
 if(input.photo?.length>1400000)throw new Error('Choose a portrait smaller than 1 MB.');
 const artist={id:input.id||crypto.randomUUID(),name,bio:String(input.bio).trim(),discipline:input.discipline||'',photo:input.photo||'',chapters:(input.chapters||[]).filter(n=>Number.isInteger(n)&&n>=0&&n<17)};
 data.artists=[...(data.artists||[]).filter(a=>a.id!==artist.id),artist];save(data);return artist;
}
const demoLot={id:'preview-badger',slug:'preview-badger',name:'The Badger Scroll — auction study',sample:true,pending:false,saleMode:'auction',stock:1,images:[{src:'/assets/exhibitions/badger.png'}],prices:{price:'10000000',currency_code:'NGN',currency_minor_unit:2},description:'Demonstration lot using existing archive artwork. Not an authenticated original offered for sale.'};
function lotProducts(data){return [demoLot,...inventory(data).filter(p=>p.saleMode==='auction'&&!p.pending)];}
export async function getAuctionLots(){const data=read();let changed=false;data.auctions||={};const lots=lotProducts(data).map(p=>{if(!data.auctions[p.id]){data.auctions[p.id]={endsAt:Date.now()+86400000,bids:[]};changed=true;}const state=data.auctions[p.id];return {...p,...state,minimumBid:state.bids.length?state.bids[0].amount+5000:Number(p.prices.price)/100};});if(changed)save(data);return lots;}
export async function placeLocalBid(id,amount,bidder){
 const data=read(),lot=lotProducts(data).find(p=>String(p.id)===String(id)),state=data.auctions?.[id];
 if(!lot||!state||lot.pending)throw new Error('This lot is not open.');
 if(Date.now()>=state.endsAt)throw new Error('Bidding has closed for this lot.');
 if(!bidder?.trim())throw new Error('Enter a display name.');
 const minimum=state.bids.length?state.bids[0].amount+5000:Number(lot.prices.price)/100;
 if(!Number.isSafeInteger(amount)||amount<minimum)throw new Error('Your bid must meet the displayed minimum.');
 state.bids.unshift({id:crypto.randomUUID(),bidder:bidder.trim(),amount,at:new Date().toISOString()});save(data);return state;
}
`;
fs.writeFileSync(p,s);
