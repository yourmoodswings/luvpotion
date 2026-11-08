import { catalog } from '../data/catalog.js';
const KEY='luvpotion-offline-shop-v1';
function read(){const raw=localStorage.getItem(KEY);if(!raw)return {cart:[],orders:[],profile:{}};try{const data=JSON.parse(raw);if(!Array.isArray(data.cart)||!Array.isArray(data.orders))throw new Error();return data;}catch{throw new Error('Saved shop data could not be read. Please export or recover your browser data before resetting it.');}}
function save(data){try{localStorage.setItem(KEY,JSON.stringify(data));}catch{throw new Error('Your browser could not save this change. Free up browser storage and try again.');}}
function inventory(data){return [...catalog.map(p=>({...p,...(data.inventory||{})[p.id]})),...Object.values(data.inventory||{}).filter(p=>!catalog.some(base=>base.id===p.id))];}
function stockFor(p,data){return Math.max(0,p.stock-data.orders.flatMap(o=>o.items).filter(i=>i.id===p.id).reduce((n,i)=>n+i.quantity,0));}
function cartView(data){const items=data.cart.map(row=>{const p=inventory(data).find(p=>p.id===row.id);if(!p)throw new Error('An object in your bag is unavailable.');const other=data.cart.filter(r=>r.id===p.id&&r.key!==row.key).reduce((n,r)=>n+r.quantity,0);return {...row,name:p.name+(row.size?` — ${row.size}`:''),images:p.images,prices:p.prices,quantity_limits:{maximum:stockFor(p,data)-other},totals:{...p.prices,line_total:String(Number(p.prices.price)*row.quantity)}};});return {items,items_count:items.reduce((n,i)=>n+i.quantity,0),totals:{currency_code:'NGN',currency_minor_unit:2,total_items:String(items.reduce((n,i)=>n+Number(i.totals.line_total),0))}};}
function validateQuantity(value){if(!Number.isInteger(value)||value<1)throw new Error('Choose a whole-number quantity of at least one.');}
export async function getProducts(){const data=read();return inventory(data).map(p=>({...p,artistName:(data.artists||[]).find(a=>a.id===p.artistId)?.name||p.artistName||'',is_in_stock:!p.pending&&stockFor(p,data)>0,is_purchasable:!p.pending&&p.prices.price!==null,add_to_cart:{maximum:stockFor(p,data)}}));}
export async function getProductBySlug(slug){return (await getProducts()).find(p=>p.slug===slug);}
export async function getCart(){return cartView(read());}
export async function addItem(id,quantity=1,variation=[]){validateQuantity(quantity);const data=read(),p=inventory(data).find(p=>p.id===id);if(!p)throw new Error('Object not found.');if(p.saleMode==='auction')throw new Error('This painting is offered through the auction room.');if(p.pending||p.prices.price==null)throw new Error('This piece is not available to order yet.');const size=variation.find(v=>v.attribute==='Size')?.value||'';if(p.sizes.length&&!p.sizes.includes(size))throw new Error('Choose a clothing size.');const total=data.cart.filter(r=>r.id===id).reduce((n,r)=>n+r.quantity,0);if(total+quantity>stockFor(p,data))throw new Error('There is not enough sample stock for that quantity.');const key=`${id}:${size}`,existing=data.cart.find(r=>r.key===key);if(existing)existing.quantity+=quantity;else data.cart.push({key,id,size,quantity});save(data);return cartView(data);}
export async function updateItem(key,quantity){validateQuantity(quantity);const data=read(),row=data.cart.find(r=>r.key===key);if(!row)throw new Error('Bag item not found.');const p=inventory(data).find(p=>p.id===row.id),others=data.cart.filter(r=>r.id===row.id&&r.key!==key).reduce((n,r)=>n+r.quantity,0);if(quantity+others>stockFor(p,data))throw new Error('There is not enough sample stock for that quantity.');row.quantity=quantity;save(data);return cartView(data);}
export async function removeItem(key){const data=read();data.cart=data.cart.filter(r=>r.key!==key);save(data);return cartView(data);}
export async function placeOrder(customer){const data=read();if(!data.cart.length)throw new Error('Your bag is empty.');if(!customer.name?.trim()||!customer.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))throw new Error('Enter your name and a valid email.');for(const row of data.cart){const p=inventory(data).find(p=>p.id===row.id);if(!p||p.saleMode==='auction'||p.pending||p.prices.price==null||data.cart.filter(r=>r.id===row.id).reduce((n,r)=>n+r.quantity,0)>stockFor(p,data))throw new Error('Stock changed. Please update your bag.');}const cart=cartView(data),order={id:crypto.randomUUID(),number:`LP-${Date.now().toString(36).toUpperCase()}`,created:new Date().toISOString(),status:'Saved locally · unpaid',customer:{name:customer.name.trim(),email:customer.email.trim()},items:cart.items,totals:cart.totals};data.orders.unshift(order);data.cart=[];data.profile=order.customer;save(data);return order;}
export async function listOrders(){return read().orders;}
export async function getOrder(id){return read().orders.find(o=>o.id===id);}
export async function getProfile(){return read().profile;}
export function money(value,prices={}){if(value==null||value==='')return 'Price unavailable';return new Intl.NumberFormat('en-NG',{style:'currency',currency:prices.currency_code||'NGN',maximumFractionDigits:prices.currency_minor_unit??2}).format(Number(value)/10**(prices.currency_minor_unit??2));}
export function plainText(html=''){return String(html).replace(/<[^>]*>/g,'');}

export async function savePiece(input){
 const data=read();
 const existing=input.id ? inventory(data).find(p=>p.id===input.id) : null;
 if(input.id&&!existing)throw new Error('Piece not found.');

 const name=String(input.name||'').trim();
 const price=Number(input.price);const stock=Number(input.stock);
 if(!name)throw new Error('Enter a piece name.');
 if(!Number.isInteger(stock)||stock<0)throw new Error('Quantity must be a whole number of zero or more.');
 if(input.price!==''&&(!Number.isFinite(price)||price<=0))throw new Error('Price must be greater than zero.');
 if(input.photo&&!input.photo.startsWith('/assets/')&&!/^data:image\/(jpeg|png|webp);base64,/.test(input.photo))throw new Error('Choose a JPG, PNG or WebP photo.');
 if(input.photo?.length>1400000)throw new Error('Choose a photo smaller than 1 MB.');
 if(input.ready&&(!input.photo||!input.price))throw new Error('Add the actual photo and a confirmed price before making the piece available.');
 const reserved=data.orders.flatMap(o=>o.items).filter(i=>i.id===input.id).reduce((n,i)=>n+i.quantity,0);
 const id=existing?.id||crypto.randomUUID();
 const collection=input.collection||existing?.collection||'metavase';
 const category=input.category||existing?.categories?.[0]?.name||(collection==='metavase'?'METAVASE':'Art & prints');
 const saleMode=input.saleMode||existing?.saleMode||'fixed';
 if(!['fixed','auction'].includes(saleMode))throw new Error('Choose a supported sale format.');
 const chapterIndex=input.chapterIndex===''||input.chapterIndex==null?null:Number(input.chapterIndex);
 if(chapterIndex!==null&&(!Number.isInteger(chapterIndex)||chapterIndex<0||chapterIndex>16))throw new Error('Choose a valid story chapter.');
 if(input.artistId&&!(data.artists||[]).some(a=>a.id===input.artistId))throw new Error('Choose an existing artist.');
 if(saleMode==='auction'&&stock>1)throw new Error('Auction lots must have one available original.');
 const piece={id,slug:existing?.slug||('object-'+id),name,collection,saleMode,chapterIndex,artistId:input.artistId||'',condition:input.condition||'',edition:input.edition||'',care:input.care||'',shipping:input.shipping||'',artistName:(data.artists||[]).find(a=>a.id===input.artistId)?.name||'',type:'simple',sample:Boolean(existing?.sample&&input.photo?.startsWith('/assets/')),pending:!input.ready,stock:stock+reserved,sizes:input.sizes!==undefined?input.sizes.split(',').map(s=>s.trim()).filter(Boolean):existing?.sizes||[],categories:[{name:category}],prices:{price:input.price===''?null:String(Math.round(price*100)),currency_code:'NGN',currency_minor_unit:2},images:input.photo?[{id,src:input.photo,alt:name}]:[],short_description:input.description||'Object details are being prepared.',description:input.description||'Object details are being prepared.',dimensions:input.dimensions||'',material:input.material||'',is_in_stock:!!input.ready&&stock>0,is_purchasable:!!input.ready,add_to_cart:{maximum:stock}};
 data.inventory={...data.inventory,[id]:piece};save(data);return piece;
}
export async function exportInventory(){return inventory(read());}

export async function listArtists(){return read().artists||[];}
export async function getArtist(id){return (await listArtists()).find(a=>a.id===id);}
export async function saveArtist(input){
 const data=read(),name=String(input.name||'').trim();
 if(!name||!String(input.bio||'').trim())throw new Error('Add the artist name and biography.');
 if(input.photo&&!/^data:image\/(jpeg|png|webp);base64,/.test(input.photo))throw new Error('Use a JPG, PNG or WebP portrait.');
 if(input.photo?.length>1400000)throw new Error('Choose a portrait smaller than 1 MB.');
 const artist={id:input.id||crypto.randomUUID(),name,bio:String(input.bio).trim(),discipline:input.discipline||'',photo:input.photo||'',chapters:(input.chapters||[]).filter(n=>Number.isInteger(n)&&n>=0&&n<17)};
 data.artists=[...(data.artists||[]).filter(a=>a.id!==artist.id),artist];save(data);return artist;
}
const demoLot={id:'preview-badger',slug:'preview-badger',name:'The Badger Scroll — auction study',sample:true,pending:false,saleMode:'auction',stock:1,images:[{src:'/assets/exhibitions/badger.png'}],prices:{price:'10000000',currency_code:'NGN',currency_minor_unit:2},description:'Demonstration lot using existing archive artwork. Not an authenticated original offered for sale.'};
function lotProducts(data){return [demoLot,...inventory(data).filter(p=>p.saleMode==='auction'&&!p.pending&&stockFor(p,data)>0)];}
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
