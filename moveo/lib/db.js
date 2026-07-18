// Simple JSON-file storage. Works on any Node host (VPS, Railway, Render persistent disk).
// NOTE: On Vercel's serverless filesystem writes are NOT persistent between deploys/invocations.
// For Vercel production, swap these two functions for Vercel KV, Supabase, or Sanity — the
// rest of the app (API routes, admin, pages) stays identical.
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function file(name) {
  return path.join(DATA_DIR, name);
}

export async function readJSON(name, fallback = []) {
  try {
    const raw = await fs.readFile(await file(name), "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export async function writeJSON(name, data) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(await file(name), JSON.stringify(data, null, 2));
}

export function isAuthed(req) {
  const header = req.headers.get("authorization") || "";
  const token = header.replace("Bearer ", "");
  return token && token === process.env.ADMIN_PASSWORD;
}
