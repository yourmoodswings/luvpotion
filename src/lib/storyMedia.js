// Large chapter media lives in IndexedDB, not the small localStorage inventory.
const DB = 'luvpotion-story-media-v1';
const kinds = { film:['video/mp4','video/webm'], narration:['audio/mpeg','audio/mp3','audio/wav','audio/x-wav','audio/ogg','audio/mp4'], captions:['text/vtt'], portrait:['image/jpeg','image/png','image/webp'] };
function openDB() {
  return new Promise((resolve,reject) => {
    const request=indexedDB.open(DB,1);
    request.onupgradeneeded=()=>request.result.createObjectStore('media');
    request.onerror=()=>reject(new Error('Chapter media storage is unavailable in this browser.'));
    request.onsuccess=()=>resolve(request.result);
  });
}
export async function saveChapterMedia(chapter,kind,file) {
  if (!Number.isInteger(chapter)||chapter<0||chapter>16||!kinds[kind]) throw new Error('Choose a chapter and media type.');
  const isVtt=kind==='captions'&&file.name?.toLowerCase().endsWith('.vtt');
  if(!kinds[kind].includes(file.type)&&!isVtt)throw new Error('This media format is not supported.');
  if(file.size>200*1024*1024)throw new Error('Choose a file smaller than 200 MB.');
  if(kind==='captions'&&!(await file.text()).trimStart().startsWith('WEBVTT'))throw new Error('Captions must be a valid WebVTT file.');
  const db=await openDB();
  try {await new Promise((resolve,reject)=>{const tx=db.transaction('media','readwrite');tx.objectStore('media').put({blob:isVtt?new Blob([file],{type:'text/vtt'}):file,name:file.name},`${chapter}:${kind}`);tx.oncomplete=resolve;tx.onerror=()=>reject(new Error('Could not save media. Check available browser storage.'));tx.onabort=()=>reject(new Error('Media save was interrupted.'));});} finally {db.close();}
}
export async function loadChapterMedia(chapter) {
  const db=await openDB();
  try {return await new Promise((resolve,reject)=>{const tx=db.transaction('media','readonly'),result={};for(const kind of Object.keys(kinds)){const req=tx.objectStore('media').get(`${chapter}:${kind}`);req.onsuccess=()=>{if(req.result)result[kind]=req.result;};}tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(new Error('Could not load chapter media.'));});}finally{db.close();}
}
export async function removeChapterMedia(chapter,kind) {
  const db=await openDB();
  try {await new Promise((resolve,reject)=>{const tx=db.transaction('media','readwrite');tx.objectStore('media').delete(`${chapter}:${kind}`);tx.oncomplete=resolve;tx.onerror=()=>reject(new Error('Could not detach media.'));});}finally{db.close();}
}
