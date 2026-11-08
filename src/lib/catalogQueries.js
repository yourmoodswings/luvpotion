export function filterProducts(products,{query='',category='All objects',exhibition='all',format='all',sort='Featured'}={}) {
 const result=products.filter(p=>
   (exhibition==='all'||p.collection===exhibition)&&
   (format==='all'||(p.saleMode||'fixed')===format)&&
   `${p.name} ${p.artistName||''} ${p.short_description||''} ${(p.categories||[]).map(c=>c.name).join(' ')} ${p.collection||''}`.toLowerCase().includes(query.trim().toLowerCase())&&
   (category==='All objects'||(category==='METAVASE'&&p.collection==='metavase')||p.categories?.some(c=>c.name===category))
 );
 if(sort!=='Featured') result.sort((a,b)=>{
   const aMissing=a.pending||a.prices?.price==null,bMissing=b.pending||b.prices?.price==null;
   if(aMissing&&bMissing)return 0;if(aMissing)return 1;if(bMissing)return -1;
   const difference=Number(a.prices.price)-Number(b.prices.price);
   return sort==='Price: high to low'?-difference:difference;
 });
 return result;
}
