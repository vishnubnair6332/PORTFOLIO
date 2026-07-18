import { readJSON, writeJSON, isAuthed } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await readJSON("projects.json", []));
}

export async function POST(req) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body?.t || !body?.c) {
    return NextResponse.json({ error: "Title and category are required." }, { status: 400 });
  }
  const projects = await readJSON("projects.json", []);
  const project = {
    id: body.id || body.t.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    t: body.t, c: body.c,
    client: body.client || "", year: body.year || "",
    tools: body.tools || "", brief: body.brief || "",
    process: body.process || "", result: body.result || "",
    cover: body.cover || "",
  };
  if (projects.some((p) => p.id === project.id)) {
    return NextResponse.json({ error: "A project with this ID already exists." }, { status: 409 });
  }
  projects.unshift(project);
  await writeJSON("projects.json", projects);
  return NextResponse.json(project, { status: 201 });
}
