# Shared administration and deployment

## What is implemented

The single Node 24 web service serves the built frontend, `/api` and `/admin` on one origin. SQLite and uploaded media live in `DATA_DIR`. No additional npm runtime dependency is required.

Administration includes product inventory/properties, artists, 17 story chapters and their media, exhibitions, standard page copy, homepage/footer/shop copy, auction lots and schedules, order review, media library and record export. Saved drafts do not change public content until published. Unpublish hides a record from public lists without deleting it. Chapter ordering remains fixed to preserve existing deep links.

There is one owner administrator, authenticated with the server's `ADMIN_PASSWORD`. The password must contain at least 16 characters. It is never built into the frontend. Sessions use HttpOnly cookies, an 8-hour expiry and CSRF tokens. Admin requests enforce APP_ORIGIN. Set a strong unique password through Render's environment settings, not GitHub. The data export contains personal order data and should be kept private.

## Local use

1. Create the ignored `.env.admin` file with ADMIN_PASSWORD, APP_ORIGIN=http://127.0.0.1:3002, PORT=3002 and DATA_DIR=.data.
2. Run `npm run build:admin`.
3. Run `npm run dev:admin`.
4. Open http://127.0.0.1:3002/admin and sign in using the password from that file.

The normal `npm run dev:local` and `npm run build` retain the existing standalone/offline preview. `build:admin` requires the shared API and shows an outage message rather than silently replacing shared stock with sample inventory.

## Render

Use `render-admin.yaml` on the `codex/admin-backend` branch as the Blueprint path. This creates a separate paid Starter web service with a 1 GB persistent disk. It does not replace the existing static service automatically. Review Render's displayed price before deploying.

Set `APP_ORIGIN` to the new service's exact HTTPS origin (no trailing slash) and set `ADMIN_PASSWORD` privately. Verify the new service, then attach luvpotion.art to it and update APP_ORIGIN to https://luvpotion.art. Use one canonical hostname for sign-in and checkout. Keep the existing static site available until the new service is verified. Never deploy this SQLite configuration without a persistent disk; ephemeral storage loses edits and uploads on restart.

The service is designed for a single Render instance. For multiple replicas, migrate persistence to shared Postgres and object storage first. Back up the full DATA_DIR regularly using a consistent SQLite backup (not only the JSON export). Export covers content, orders and bids, while media files must also be copied. A restore workflow is not yet exposed in the admin UI.

## Payment and customer boundaries

Regular shop orders remain server-priced unpaid preview requests, not confirmed purchases or stock reservations. Admins can mark those requests reviewed or cancelled, but cannot mark them paid. Auction Paystack checkout is implemented separately below and remains disabled until configured and tested. Preview lots remain non-binding; live lots require approved bidder accounts and confirmed inventory. The regular shop still needs its own payment and stock-reservation release.

Browser-only products, films and orders are not imported automatically. Upload original media and publish content in the shared admin. The record export does not include login sessions or administrator credentials.

## Checks

- `npm run test:admin` uses a temporary database and local HTTP server to verify login, CSRF/origin checks, publish lifecycle, revision conflicts, server-side prices, private orders, upload restrictions, persistence and logout.
- `npm run build:admin`
- `node scripts/verify-routes.mjs --production`
- Existing offline store, METAVASE and story-platform verification scripts remain applicable to standalone mode.

## Live auction release

The collector room now supports approved bidder accounts, server-serialized bids, duplicate-request protection, fixed server closing times, immutable terms after the first bid, winner results, and winner-only Paystack checkout. Vases and other objects use the same product/lot workflow. Public bid history masks collector identities. The frontend polls shared updates every four seconds and disables bidding when polling fails. There is no automatic bidding or anti-sniping extension.

Configure these privately on the Node service (never VITE variables):

- `PAYSTACK_SECRET_KEY`: start with a Paystack test secret. Production live lots require an `sk_live_` key.
- `PAYSTACK_WEBHOOK_SECRET`: use your `whsec_` signing secret if enabled in Paystack. Otherwise leave blank for the legacy secret-key signature protocol.
- `LIVE_AUCTIONS_ENABLED=true`: enable only after checkout testing and actual lot data are ready.
- Register `https://YOUR-SERVICE/api/paystack/webhook` in Paystack. Localhost cannot receive external webhooks; use the deployed test service for end-to-end verification.

In admin, publish an actual product with `sample` off, `ready` on, sale mode `auction`, stock exactly 1, and confirmed photograph/price/properties. Create a lot, select that product, set mode `live`, opening/closing times and a whole-naira increment, and supply bidding and delivery terms. Publish it. Prices are NGN; the server converts the winning amount to kobo. Delivery arrangements/costs must be disclosed in the lot terms; checkout charges the winning amount only.

Collectors register with a password, email and phone, then appear in **Bidders**. The team must verify their contact details directly before approval. Email verification, password recovery email, and winner notification email are not automated. Collectors see their results and payment actions in the auction room while signed in. The team sees contact details and payment status under **Auction results**. Failed or ambiguous payment initialization retains the original reference for reconciliation; it does not issue a second charge attempt with another reference. Such a payment can require operator investigation in Paystack. Unpaid winners are not automatically reassigned to the next bidder.

Paystack success is checked server-side against reference, exact amount, currency, account email, and test/live mode. Signed webhook delivery and browser return checks use the same idempotent settlement, marking the object sold once. The provider is mocked in `npm run test:auctions`; this is not evidence of a real Paystack transaction. Run a hosted Paystack test checkout and webhook delivery before enabling live keys.

Live-auction product records are locked while published lots reference them; lot records lock after bidding or closure. Closing results are materialized from persisted bids on the next request and remain correct after restarts. No background email or fulfillment jobs run. This implementation needs the persistent Render web service described above and is not active on the static website.

### Mobile design verification

Decorative link arrows were removed. Shared navigation, product cards, filters, auction details and admin layouts have responsive styles. The desktop browser automation runtime failed to initialize during this change, so actual rendered mobile widths still need visual verification; build and server-render checks alone do not establish appearance.

References: https://paystack.com/docs/payments/verify-payments/ and https://paystack.com/docs/payments/webhooks/.
