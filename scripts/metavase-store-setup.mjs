import fs from 'node:fs';
const p='src/lib/storeApi.js';let s=fs.readFileSync(p,'utf8');
s=s.replace("function stockFor(p,data)","function inventory(data){return [...catalog.map(p=>({...p,...(data.inventory||{})[p.id]})),...Object.values(data.inventory||{}).filter(p=>!catalog.some(base=>base.id===p.id))];}\nfunction stockFor(p,data)");
s=s.replaceAll('catalog.find(p=>p.id===','inventory(data).find(p=>p.id===');
s=s.replace('return catalog.map(p=>({...p,is_in_stock:stockFor(p,data)>0,','return inventory(data).map(p=>({...p,is_in_stock:!p.pending&&stockFor(p,data)>0,is_purchasable:!p.pending&&p.prices.price!==null,');
s=s.replace("if(!p)throw new Error('Object not found.');","if(!p)throw new Error('Object not found.');if(p.pending||p.prices.price==null)throw new Error('This piece is not available to order yet.');");
s=s.replace("if(!p||data.cart.filter", "if(!p||p.pending||p.prices.price==null||data.cart.filter");
s += `
export async function savePiece(input){
 const data=read();
 const existing=input.id ? inventory(data).find(p=>p.id===input.id) : null;
 if(input.id&&!existing)throw new Error('Piece not found.');
 if(existing&&existing.collection!=='metavase')throw new Error('Only METAVASE pieces can be edited here.');
 const name=String(input.name||'').trim();
 const price=Number(input.price);const stock=Number(input.stock);
 if(!name)throw new Error('Enter a piece name.');
 if(!Number.isInteger(stock)||stock<0)throw new Error('Quantity must be a whole number of zero or more.');
 if(input.price!==''&&(!Number.isFinite(price)||price<=0))throw new Error('Price must be greater than zero.');
 if(input.photo&&!/^data:image\\/(jpeg|png|webp);base64,/.test(input.photo))throw new Error('Choose a JPG, PNG or WebP photo.');
 if(input.photo?.length>1400000)throw new Error('Choose a photo smaller than 1 MB.');
 if(input.ready&&(!input.photo||!input.price))throw new Error('Add the actual photo and a confirmed price before making the piece available.');
 const reserved=data.orders.flatMap(o=>o.items).filter(i=>i.id===input.id).reduce((n,i)=>n+i.quantity,0);
 const id=existing?.id||Date.now();
 const piece={id,slug:existing?.slug||('metavase-'+id),name,collection:'metavase',type:'simple',sample:false,pending:!input.ready,stock:stock+reserved,sizes:[],categories:[{name:'METAVASE'}],prices:{price:input.price===''?null:String(Math.round(price*100)),currency_code:'NGN',currency_minor_unit:2},images:input.photo?[{id,src:input.photo,alt:name}]:[],short_description:input.description||'Painted artwork on a handcrafted or molded flower vase.',description:input.description||'Painted artwork on a handcrafted or molded flower vase.',dimensions:input.dimensions||'',material:input.material||'',is_in_stock:!!input.ready&&stock>0,is_purchasable:!!input.ready,add_to_cart:{maximum:stock}};
 data.inventory={...data.inventory,[id]:piece};save(data);return piece;
}
export async function exportInventory(){return inventory(read()).filter(p=>p.collection==='metavase');}
`;
fs.writeFileSync(p,s);
