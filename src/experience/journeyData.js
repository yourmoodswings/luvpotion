export const journeyScenes = [
 {id:'threshold',number:'00',label:'The invitation',title:'Nothing here is just an object.',body:'A painting can question power. A flower vase can carry a childhood. A pair of hands can build an entirely different world.',prompt:'Touch a fragment. See where it leads.'},
 {id:'maker',number:'01',label:'The maker',title:'One mind. Many ways of making.',body:'Rebuilding off-road trucks. Directing films. Painting history. Shaping towels and cement into vessels. Different materials, the same impulse: to make something that has a story to tell.',prompt:'Choose a way into the workshop.'},
 {id:'power',number:'02',label:'Heads of State',title:'Look at power. Then look again.',body:'Seventeen leaders become seventeen encounters. Enter an artistic interpretation of Nigeria’s history through the figures, images, and stories it leaves behind.',prompt:'Open a file to reveal its story.'},
 {id:'vessel',number:'03',label:'METAVASE / IKA V1',title:'Memory takes a new shape.',body:'A towel. Cement. A muscular flower vase. IKA V1 carries Ali and Simbi into another form—a meeting between the things we remember and the things we make.',prompt:'Follow the material from cloth to story.'},
 {id:'collect',number:'04',label:'Take the story with you',title:'The story doesn’t end at the screen.',body:'A painted vessel, a plate, a shirt, an original work. Collect an object that keeps the encounter going in your own world.',prompt:'Choose your next encounter.'},
];
export const practices=[
 {id:'build',label:'Build',word:'STRUCTURE',title:'The instinct to rebuild.',body:'Working on off-road trucks means thinking in weight, stance, parts, and possibility. That attention to form belongs in this story too.',note:'Workshop film and truck photographs to be added.'},
 {id:'direct',label:'Direct',word:'SEQUENCE',title:'The instinct to frame.',body:'Film makes meaning through the order of what we see. The founding artist’s work in directing informs how LUVPOTION can reveal an artwork, hold a moment, and change a perspective.',note:'Director’s footage and voiceover to be added.'},
 {id:'paint',label:'Paint',word:'PERSPECTIVE',title:'The instinct to question.',body:'Heads of State turns the leader’s image into a starting point. The work invites a closer encounter with history, power, and the artist’s interpretation.',note:'Explore the existing Heads of State artwork.'},
];
export const materialSteps=[
 {label:'01 / Cloth',title:'Begin with the ordinary.',body:'A towel starts the process. Its folds suggest a form before the vessel exists.'},
 {label:'02 / Form',title:'Give the fold a body.',body:'Cement gives the shaped material structure. The artist builds a flower vase with a strong, muscular silhouette.'},
 {label:'03 / Memory',title:'Give the body a story.',body:'On IKA V1, Ali and Simbi become part of the painted story. A familiar memory meets an unfamiliar surface.'},
];
export function sceneIndex(id){return Math.max(0,journeyScenes.findIndex(s=>s.id===id));}
export function readTrail(storage){try{const value=JSON.parse(storage?.getItem('luvpotion-journey-v1')||'[]');return Array.isArray(value)?value.filter(id=>journeyScenes.some(s=>s.id===id)):[];}catch{return [];}}
export function addToTrail(trail,id){return journeyScenes.some(s=>s.id===id)?[...trail.filter(previous=>previous!==id),id]:trail;}
