import { readJSON, writeJSON, isAuthed } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }

  const lead = {
    id: Date.now().toString(36),
    name: String(body.name).slice(0, 200),
    email: String(body.email).slice(0, 200),
    phone: String(body.phone || "").slice(0, 50),
    company: String(body.company || "").slice(0, 200),
    message: String(body.message).slice(0, 5000),
    createdAt: new Date().toISOString(),
  };

  const leads = await readJSON("leads.json", []);
  leads.unshift(lead);
  await writeJSON("leads.json", leads);

  // Optional: forward to Formspree / email webhook
  if (process.env.CONTACT_WEBHOOK_URL) {
    fetch(process.env.CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(lead),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}

// Admin: view leads
export async function GET(req) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await readJSON("leads.json", []));
}
