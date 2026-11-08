// Explicit local-only sample content for reviewing the auction interface.
if(process.env.NODE_ENV==='production')throw new Error('Local preview only.');
const base='http://127.0.0.1:3002';
const login=await fetch(base+'/api/admin/login',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:JSON.stringify({password:process.env.ADMIN_PASSWORD})});
if(!login.ok)throw new Error('Local admin sign-in failed.');
const {csrf}=await login.json(),cookie=login.headers.get('set-cookie').split(';')[0];
async function call(url,method='GET',data){const r=await fetch(base+'/api/admin/'+url,{method,headers:{Origin:base,Cookie:cookie,'X-CSRF-Token':csrf,'Content-Type':'application/json'},...(data?{body:JSON.stringify(data)}:{})});const result=await r.json();if(!r.ok)throw new Error(result.error);return result;}
async function seed(kind,id,record){const existing=await call('records/'+kind);if(existing.some(r=>r.id===id))return;await call(`records/${kind}/${id}`,'PUT',{record});await call(`records/${kind}/${id}/publish`,'POST',{version:1});}
try{await seed('products','preview-vase',{name:'METAVASE — preview study',slug:'metavase-auction-preview',collection:'metavase',category:'Vases',price:200000,stock:1,photo:'/assets/shop/vase.svg',description:'Illustrated vase used to preview the auction experience. This is not an actual work offered for sale. Real photographs and confirmed details will replace this study.',sizes:'',saleMode:'auction',sample:true,ready:true,material:'Illustrated study',dimensions:'To be confirmed'});
await seed('auctions','preview-vase-lot',{name:'METAVASE — preview study',productId:'preview-vase',startsAt:new Date(Date.now()-60000).toISOString(),endsAt:new Date(Date.now()+7*86400000).toISOString(),increment:5000,enabled:true,mode:'preview',terms:'Demonstration only. Bids create no purchase obligation.',delivery:'No payment or delivery for this preview.'});
console.log('Local sample auction added. Live bidding remains disabled.');
}finally{await call('logout','POST',{});}
