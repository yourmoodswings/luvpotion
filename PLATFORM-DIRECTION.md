# LUVPOTION experience direction

LUVPOTION is a digital art storytelling and collecting platform, not a single
exhibition site or a conventional catalog with decorative gallery pages.

## The visitor journey

Discover an exhibition -> enter its story -> encounter the artwork and artist ->
collect a related object or bid on an original painting.

Keep the platform homepage broad: exhibitions, artists, shop and auctions.
Do not let METAVASE or any individual exhibition replace the wider platform.
Each exhibition can have its own presentation grammar.

Heads of State uses an investigation-board landing page. Selecting a leader
reveals a dossier preview; entering opens a cinematic chapter with passage-based
writing, an artwork view, film/voiceover media and artist/collecting connections.
The board includes all 17 entries from the supplied archive. These are curatorial
interpretations, not new factual allegations or invented historical evidence.

METAVASE retains an object-focused presentation for painted flower vases.
Heads of State also has its own painted flower-vase series; do not conflate the two.
The owner mentioned broader Nigerian stories including Simbi Goes to School.
Do not fabricate work titles, edition details, authorship or availability from
that reference; add supplied inventory and narratives through the studio.

## Content relationships

A product has a category (painting, vase, clothing, etc.), exhibition/collection,
optional chapter, artist, medium/material, dimensions, condition, edition, care,
fulfillment notes and sale format. A product can belong to an exhibition without
being a generic exhibition category. Preserve combined filters in the shop.

An artist profile holds supplied biography and portrait, chapter credits, and
associated products. Missing names are pending attribution, not invented profiles.

Fixed-price products enter the bag. Auction paintings enter the auction room;
auction lots cannot enter ordinary checkout. Pending content is browseable but
cannot be ordered. Historical order snapshots survive later inventory edits.

## Local implementation

- `/exhibitions/heads-of-state`: investigation board.
- `/exhibitions/heads-of-state#chapter-0`: first cinematic chapter, through 16.
- `/artists`, `/artists/:id`: artist directory and linked work.
- `/drops?exhibition=heads-of-state`: exhibition-linked objects.
- `/auctions?lot=<id>`: selected local auction lot.
- `/studio`: all inventory, artists/chapters, properties and sale format.
- `/studio/artists`: supplied artist profiles and chapter credits.
- `/studio/media?chapter=0`: local film, voiceover, portrait and WebVTT captions.

Chapter media is stored in IndexedDB. Inventory, artist profiles, orders and bids
use the existing localStorage store. Preserve the user's existing saved objects.
Original media files should be retained outside the browser. File attachments do
not upload anything. Existing browsers with unavailable IndexedDB still have
bundled artwork, written chapters and the ambient soundtrack.

The source ZIP was checked: it contains ambient.mp3 but no MP4/WebM/MOV film and
no source video URL. Motion studies are labeled placeholders, not recovered films.
Reduced-motion users get a still presentation. Sound is opt-in. Videos retain
native controls. Film, narration and ambient audio pause each other when started.

Auction bids are entered manually; no automated bidding or fake competitors.
A lot's local 24-hour preview deadline persists and does not reset on reload.
All commerce remains local and unpaid. Public sales require authentication,
shared transactional inventory/bids, payments and fulfillment. The local studio
is not a secure public administration interface.

## Verification

`npm run build`
`node scripts/verify-routes.mjs`
`node scripts/verify-store.mjs`
`node scripts/verify-metavase.mjs`
`node scripts/verify-story-platform.mjs`

Route checks include board/chapter deep links and invalid hashes. Store checks
cover artist attribution, exhibition filters, fixed-price/auction separation,
bid validation and deadlines, plus existing bag/order/stock behavior. These are
code-level checks, not browser visual or media-playback verification.
