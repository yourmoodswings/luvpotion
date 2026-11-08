import fs from 'node:fs';
function edit(file,pairs){let s=fs.readFileSync(file,'utf8');for(const [a,b]of pairs){if(!s.includes(a))throw new Error(`Missing replacement in ${file}: ${a}`);s=s.replace(a,b);}fs.writeFileSync(file,s);}
edit('src/pages/Product.jsx',[
["[quantity,setQuantity]=useState(1)","[quantity,setQuantity]=useState(1),[size,setSize]=useState('')"],
['await add(product.id,quantity)',"await add(product.id,quantity,size?[{attribute:'Size',value:size}]:[])"],
['<span className="lp-stock">','<p className="lp-sample-note">Sample inventory · illustrated object · example price</p><span className="lp-stock">'],
['<label>Quantity<input','{product.sizes?.length>0&&<label>Size<select value={size} onChange={e=>setSize(e.target.value)}><option value="">Select a size</option>{product.sizes.map(s=><option key={s}>{s}</option>)}</select></label>}<label>Quantity<input'],
['disabled={adding} onClick={addToBag}','disabled={adding||Boolean(product.sizes?.length&&!size)} onClick={addToBag}'],
['Available delivery options, taxes, and charges are confirmed by the shop at checkout. Refer to the product listing for material and care information.','This offline shop saves unpaid sample orders on your device. Shipping, payment, and verified care information will be added when real inventory is available.']]);
edit('src/pages/Drops.jsx',[
['Pendants, medallions, and heirlooms. Cultural memory, made tangible.','Antiques, vases, plates, clothing, and everyday objects with a point of view.'],
['<section className="lp-shop">','<section className="lp-shop"><p className="lp-sample-note">Offline collection · Sample inventory, illustrations, and prices. Browse, build a bag, and save an unpaid order on this device.</p>'],
['/assets/hero-3.png','/assets/shop/bowl.svg'],
['Artwork from the LUVPOTION visual archive','Illustrated serving bowl from the sample collection'],
['Our shop connection is temporarily unavailable. Please try again shortly.','Your saved shop data could not be loaded. Please check your browser storage.']]);
edit('src/pages/Cart.jsx',[['Delivery and taxes are confirmed in the shop.','Offline sample order. No payment, shipping, or taxes are processed.']]);
edit('src/contexts/CartContext.jsx',[
['useContext, useState, useCallback','useContext, useState, useCallback, useEffect'],
['  const mutate = async fn => {',"  useEffect(() => { refresh(); const sync = () => refresh(); window.addEventListener('storage', sync); return () => window.removeEventListener('storage', sync); }, [refresh]);\n  const mutate = async fn => {"],
["catch { throw new Error('We couldn’t update your bag. Please try again.'); }","catch (error) { throw error; }"],
['We couldn’t reach your bag. Your shop connection may be unavailable.','We could not read your saved bag. Check your browser storage and try again.']]);
edit('src/pages/Home.jsx',[
['Explore the editions and objects in the LUVPOTION shop.','Antiques, sculptural vases, plates, clothing, and objects for everyday rituals.'],
['<img src="/assets/hero-3.png" alt="Selected artwork from the LUVPOTION collection"','<img src="/assets/shop/vase.svg" alt="Illustrated vase from the sample collection"']]);
