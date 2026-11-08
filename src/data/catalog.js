// Starter inventory only. Replace with verified stock, photographs, provenance and prices before sales.
const entries = [
 [1,'earth-vase','Earth Vessel','Vases',45000,'vase',6,'A sculptural terracotta-toned vase for a quiet corner.',[]],
 [2,'botanical-plate','Botanical Plate','Plates',28000,'plate',12,'An illustrated ceramic plate with a deep green botanical motif.',[]],
 [3,'archive-tee','Archive T-Shirt','Clothing',22000,'shirt',24,'A relaxed everyday tee carrying the LUVPOTION wordmark.',['S','M','L','XL']],
 [4,'objects-tote','Objects & Stories Tote','Accessories',15000,'tote',18,'A canvas-style carryall for books, finds, and everyday essentials.',[]],
 [5,'brass-candlestick','Brass Candlestick Study','Antiques',65000,'candle',1,'A sample antique-style object. Age, origin, authenticity and condition have not been verified.',[]],
 [6,'earth-bowl','Earth Serving Bowl','Plates',35000,'bowl',8,'A warm, sculptural bowl for the table or display shelf.',[]],
 [7,'memory-print','Memory in Form Print','Art & prints',18000,'print',20,'An original geometric illustration for the sample collection.',[]],
 [8,'heritage-vessel','Heritage Vessel Study','Antiques',85000,'vase',1,'A sample antique-style vessel. No historical provenance or authenticity is claimed.',[]],
];
export const catalog = entries.map(([id,slug,name,category,price,art,stock,description,sizes])=>({
 id,slug,name,type:'simple',sample:true,stock,sizes,categories:[{name:category}],
 prices:{price:String(price*100),currency_code:'NGN',currency_minor_unit:2},
 images:[{id,src:`/assets/shop/${art}.svg`,alt:`Illustration of ${name}; sample inventory`}],
 short_description:description,description:`${description} This is starter inventory for the offline shop. The illustration, price and stock are examples, not a verified item offered for sale.`,
 is_in_stock:true,is_purchasable:true,add_to_cart:{maximum:stock},
}));

catalog.unshift({id:1001,slug:'metavase-flower-vase',name:'METAVASE Flower Vase',collection:'metavase',type:'simple',sample:false,pending:true,stock:0,sizes:[],categories:[{name:'METAVASE'}],prices:{price:null,currency_code:'NGN',currency_minor_unit:2},images:[],short_description:'Painted artwork on handcrafted or molded flower vases.',description:'METAVASE brings painting into three dimensions through flower vases. Collection pricing is expected to start around ₦200,000; the final price, photographs, dimensions, materials and availability of each piece are still to be confirmed.',is_in_stock:false,is_purchasable:false,add_to_cart:{maximum:0}});

// The series is confirmed by the owner; piece-level assets and availability are not yet supplied.
catalog.push({id:1101,slug:'heads-of-state-painted-vases',name:'Heads of State — Painted Flower Vases',collection:'heads-of-state',category:'Vases',type:'simple',sample:false,pending:true,stock:0,sizes:[],categories:[{name:'Vases'}],prices:{price:null,currency_code:'NGN',currency_minor_unit:2},images:[],short_description:'Painted flower vases carrying stories from Heads of State and Nigerian history.',description:'The Heads of State collection extends from paintings into flower vases and related objects. Individual works, artist credits, photographs, final prices and availability will be added as supplied.',is_in_stock:false,is_purchasable:false,add_to_cart:{maximum:0}});
