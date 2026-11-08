# LUVPOTION — offline local shop

Run `npm run dev:local`, then open http://127.0.0.1:5173/drops.
Keep that terminal open. No internet or WordPress/Supabase account is required
once dependencies are installed. The Node server serves files locally; it must
remain running. This is not an installed PWA that opens with the server stopped.

The shop includes eight sample products: vases, a plate, a serving bowl,
a T-shirt with sizes, a tote, an antique-style candlestick and an art print.
All product illustrations are bundled locally. Prices are examples in NGN.
Antique-style samples do not claim verified age, origin or authenticity.
Edit `src/data/catalog.js` to replace the starter inventory with real products.

Bag, sample stock reservations, checkout details and unpaid orders persist in
browser localStorage under `luvpotion-offline-shop-v1`. Use the same browser and
URL each time: localhost and 127.0.0.1 have separate storage. Clearing site data
removes local records. Account > Export orders saves a JSON copy.
No card information is collected; no payment, email or delivery is initiated.
This device-local setup is not a shared inventory or authenticated production shop.

Checkout validates stock and writes the order and emptied bag together.
Clothing sizes are separate bag lines; total stock is shared across sizes.
Sample orders reserve sample inventory locally. Concurrent editing across tabs
is not a shared transactional inventory system.

The gallery and exhibitions use bundled artwork and optional local audio.
The auction room is a clearly labeled local simulation using port 3001.

Design: `src/components/SiteLayout.jsx`, `src/world.css`, and `src/pages/Home.css`.
Catalog and persistence: `src/data/catalog.js`, `src/lib/storeApi.js`.

Checks:
- `npm run build`
- `node scripts/verify-store.mjs` tests the full offline shopping lifecycle,
  stock, sizes, persistence and storage failures with all network calls disabled.
- `node scripts/verify-routes.mjs` checks rendering of all routes, not visual QA.

## METAVASE exhibition and inventory

Open `/exhibitions/metavase` for the featured exhibition and
`/drops?collection=METAVASE` for the linked shop collection.
The collection describes painted artwork on handcrafted or molded flower vases.
Expected starting price: approximately NGN 200,000, not a confirmed piece price.

Use `/studio` (also linked from the footer) to enter actual names, JPG/PNG/WebP
photos under 1 MB, confirmed NGN prices, remaining quantity, dimensions, and
materials. Mark details confirmed to enable local ordering. Drafts remain visible
with pending details and cannot be added to the bag. No real photos or availability
were supplied at setup; the exhibition graphic is a labeled abstract silhouette.

Studio edits and additional pieces persist with existing browser shop data.
Existing order snapshots stay unchanged. Setting remaining quantity accounts for
already saved local orders. Export inventory from Studio before clearing storage.
The editor is local and unauthenticated: it must not be deployed publicly as an admin.
Checkout remains local and unpaid; online payment and shared inventory are not enabled.

Run `node scripts/verify-metavase.mjs` for draft/confirmation, price/photo validation,
collection ordering, stock, restocking, saved-order snapshots and draft reversal checks.

## Storytelling and artist platform — November 2026

Read `PLATFORM-DIRECTION.md` before changing exhibition or platform structure.
Heads of State now opens on an investigation board; `#chapter-N` opens the cinematic
player. Its film view uses an explicitly labeled moving-still placeholder until
a film is attached. The original ZIP contains ambient audio but no video file.

`/studio` now manages all collection types, artist links, chapter links, product
properties and fixed-price/auction sale formats. `/studio/artists` adds supplied
artist profiles. `/studio/media` stores chapter films, voiceovers, portraits and
WebVTT captions in IndexedDB (max 200 MB per file).

The auction page now uses locally persisted manual bids. It does not use the old
Socket.IO demo's automated bids. The legacy backend may still run with the existing
launcher but is not connected to the new auction UI. No remote bidding or payment
is implemented; original-asset sale verification remains required before launch.

`node scripts/verify-story-platform.mjs` adds chapter, author/product relationship,
combined shop filter, auction bid and media-validation checks.
