# Moveo Studio — Agency Site + Backend

Next.js (App Router) site with a built-in backend:
- **Contact API** (`/api/contact`) — saves leads to `data/leads.json` and optionally forwards to a webhook (Formspree, Zapier, email service)
- **Projects API** (`/api/projects`) — CRUD, password-protected
- **Admin panel** (`/admin`) — add/edit/delete portfolio projects and read leads, no code needed
- Public pages read project data live, so anything added in `/admin` appears instantly on the Home work scroll and the Portfolio grid

## Run locally
```bash
npm install
cp .env.example .env.local   # set ADMIN_PASSWORD
npm run dev                  # http://localhost:3000  (admin at /admin)
```

## Environment variables
| Var | Purpose |
|---|---|
| `ADMIN_PASSWORD` | Password for /admin and write APIs (required) |
| `CONTACT_WEBHOOK_URL` | Optional — forward each lead to Formspree/Zapier/etc. |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number for CTAs, digits only |

## Deploying
- **Railway / Render / any VPS** — works as-is; JSON files persist on disk. Easiest option.
- **Vercel** — pages and contact-webhook forwarding work, but file writes don't persist on serverless. Swap `lib/db.js`'s two functions for Vercel KV, Supabase, or Sanity (the rest of the code is unchanged) — or just keep `CONTACT_WEBHOOK_URL` set so leads reach your email regardless.

## Where things live
```
app/page.js            Home
app/portfolio/page.js  Vishnu's portfolio
app/admin/page.js      CMS admin
app/api/…              Backend routes
lib/db.js              Storage layer (swap here for a real DB)
data/projects.json     Seed content
```
