export const foundingArtist={id:'the-maker',name:'The founding artist',discipline:'Painting / Film / Sculptural objects',bio:'A builder, filmmaker, and painter working across image and form. From rebuilding off-road trucks to shaping towels and cement into flower vases, the practice connects making with stories of Nigerian history and cultural memory.'};
export const projectDefaults=[
 {id:'heads-of-state',slug:'heads-of-state',name:'Heads of State',artistId:'the-maker',medium:'Painting',release:'The power archive',eyebrow:'History / Power / Satire',hero:'/assets/exhibitions/tafawa-mobile.png',description:'Nigerian history, seen through a painter’s eye.'},
 {id:'metavase',slug:'metavase',name:'METAVASE',artistId:'the-maker',medium:'Sculptural objects',release:'VASE 1',eyebrow:'Painting / Form / Memory',hero:'',description:'Painting moves beyond the canvas. First release: VASE 1.'},
];
export function portfolioProjects(content){return content?content.exhibitions.map(e=>({...projectDefaults.find(p=>p.slug===e.slug),...e,artistId:e.artistId||(projectDefaults.some(p=>p.slug===e.slug)?content.settings?.foundingArtistId||'the-maker':'')})):projectDefaults;}
export function artistIdentity(content,id){return content?.artists?.find(a=>a.id===id)||(id==='the-maker'?foundingArtist:null);}
