export const ikaImages = [
  {src:'/assets/ika/front.webp',alt:'IKA painted concrete vase, front view',label:'Front'},
  {src:'/assets/ika/side.webp',alt:'IKA painted concrete vase, alternate view',label:'Side'},
];
export const ikaDescription='An upcycled concrete flower vase by Anietie James Ekiko. A sculptural surface carries a painted story of Nigerian life, culture and memory.';
export function launchProducts(products){
  return products.filter(p=>p.collection!=='heads-of-state'&&!p.sample).map(p=>p.slug==='metavase-flower-vase'?{...p,name:'IKA — VASE 1',artistName:'Anietie James Ekiko',artistId:p.artistId||'the-maker',images:ikaImages,short_description:ikaDescription,description:'IKA turns discarded everyday materials into lasting storytelling artefacts. Each form is handcrafted in concrete composite and painted with a visual narrative. This photographed work introduces the series; final price, dimensions and availability are awaiting confirmation.',material:'Handcrafted concrete composite with reclaimed materials; painted surface',ika:true}:p);
}
