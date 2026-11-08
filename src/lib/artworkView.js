export function clampView(zoom, x, y, width, height) {
  const scale=Math.max(1,Math.min(4,Number.isFinite(zoom)?zoom:1));
  const maxX=Math.max(0,width)*(scale-1)/2,maxY=Math.max(0,height)*(scale-1)/2;
  return {zoom:scale,x:Math.max(-maxX,Math.min(maxX,x)),y:Math.max(-maxY,Math.min(maxY,y))};
}
export function shortPassage(text,limit=55){
 const words=text.trim().split(/\s+/);
 if(words.length<=limit)return text;
 const excerpt=words.slice(0,limit).join(' ');
 const end=Math.max(excerpt.lastIndexOf('. '),excerpt.lastIndexOf('? '),excerpt.lastIndexOf('! '));
 return end>excerpt.length/3?excerpt.slice(0,end+1):excerpt.replace(/[,;:]$/,'')+'…';
}
