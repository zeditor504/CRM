# Apex OS

Apex OS is a dealership (powersports/motorcycle) management system. It has two loosely-coupled layers:

- **Static frontend (the actual product):** plain HTML pages at the repo root (`login.html`, `owner.html`, `index.html`, `manager.html`, `finance.html`, `service.html`, `parts.html`, `deal-desk.html`, `showroom.html`, `portal.html`, `integrations.html`, `importleads.html`) plus a shared engine `apex-core.js`. Styling is via the Tailwind CDN; data is mock/client-side. No build step.
- **Backend API (optional, prototype):** `server.js` (Express + Socket.IO + JWT) backed by PostgreSQL (`schema.sql`). It is **not wired to the frontend** — the HTML pages make no API/socket calls. It exists to exercise `/api/login` and the `update_ro_status` realtime socket flow.

`package.json` declares the backend Node dependencies (none existed originally).

## Cursor Cloud specific instructions

### Frontend (primary product)
- Serve the repo root as static files; there is **no build step and no hot reload** (it's static HTML, refresh the browser to see changes). Tailwind/Google Fonts load from CDNs, so the page needs internet access to render fully.
- Run: `python3 -m http.server 8080` (or `npm run serve:frontend`), then open `http://localhost:8080/login.html`.
- Entry point is `login.html`. All dashboards redirect back to `login.html` unless `sessionStorage.apex_session` is set, which the login page sets when you click a role. So to deep-link to a page (e.g. `importleads.html`) you must first "log in" by clicking any role on `login.html`.
- Good end-to-end smoke flow: `login.html` → click a role → dashboard → `importleads.html` → pick a CRM → "Begin Synchronization" → "Enter Sales Dashboard".

### Backend (optional API)
- Requires PostgreSQL. PostgreSQL is **not** included in the update script (service startup must be done at session start). Start it with `sudo pg_ctlcluster 16 main start`.
- One-time DB setup (idempotent-ish): create role/db `apex`, then load schema: `PGPASSWORD=apex psql -h 127.0.0.1 -U apex -d apex -f schema.sql`. `/api/login` looks up users by email only (no password check), so seed at least one row in `users` to get a non-401 response.
- Run: `DATABASE_URL="postgres://apex:apex@127.0.0.1:5432/apex" PORT=3000 node server.js` (or `npm start`). The server requires `DATABASE_URL`; queries fail without a reachable Postgres.
- No automated test suite, linter, or build is configured in this repo.
