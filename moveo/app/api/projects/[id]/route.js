import { readJSON, writeJSON, isAuthed } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const projects = await readJSON("projects.json", []);
  const i = projects.findIndex((p) => p.id === params.id);
  if (i === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  projects[i] = { ...projects[i], ...body, id: params.id };
  await writeJSON("projects.json", projects);
  return NextResponse.json(projects[i]);
}

export async function DELETE(req, { params }) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const projects = await readJSON("projects.json", []);
  const next = projects.filter((p) => p.id !== params.id);
  if (next.length === projects.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await writeJSON("projects.json", next);
  return NextResponse.json({ ok: true });
}
