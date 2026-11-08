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

Paystack is not enabled by this change. Orders are server-priced unpaid preview requests, not confirmed purchases or stock reservations. Admins can mark requests reviewed or cancelled, but cannot mark them paid. Bids remain explicitly non-binding previews; public bidders do not have verified identities. The payment release must add Paystack server initialization/verification, authenticated webhook handling, inventory reservation/expiry, and payment/fulfillment state transitions before real sales.

Browser-only products, films and orders are not imported automatically. Upload original media and publish content in the shared admin. The record export does not include login sessions or administrator credentials.

## Checks

- `npm run test:admin` uses a temporary database and local HTTP server to verify login, CSRF/origin checks, publish lifecycle, revision conflicts, server-side prices, private orders, upload restrictions, persistence and logout.
- `npm run build:admin`
- `node scripts/verify-routes.mjs --production`
- Existing offline store, METAVASE and story-platform verification scripts remain applicable to standalone mode.
