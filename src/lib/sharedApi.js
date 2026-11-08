export const sharedRequired=import.meta.env?.VITE_SHARED_BACKEND==='true';
let cached=null,pending=null;
export async function getSharedContent(force=false){
 if(typeof window==='undefined')return null;
 if(cached&&!force)return cached;
 if(pending)return pending;
 pending=(async()=>{const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),5000);try{const r=await fetch('/api/content',{signal:controller.signal,headers:{Accept:'application/json'}});if(!r.headers.get('content-type')?.includes('application/json')){if(sharedRequired)throw new Error('Shared server unavailable.');return null;}if(!r.ok)throw new Error('The shared collection is temporarily unavailable.');const data=await r.json();if(data.shared)cached=data;return data.shared?data:null;}catch(e){if(cached||sharedRequired)throw new Error('The shared collection is temporarily unavailable.');return null;}finally{clearTimeout(timer);pending=null;}})();return pending;
}
export function sharedSnapshot(){return cached;}
export async function sharedRequest(path,body){const r=await fetch(path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});const data=await r.json();if(!r.ok)throw new Error(data.error||'Request failed.');return data;}
