"use client";
import { useEffect, useState } from "react";

const CATS = ["Branding & Logo","Print & Brochure","Social Media Design","Video Editing","Motion Graphics","Packaging","UI-UX"];
const empty = { t:"", c:CATS[0], client:"", year:"2026", tools:"", brief:"", process:"", result:"", cover:"" };

export default function Admin() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState("");

  const H = { "Content-Type": "application/json", Authorization: `Bearer ${pw}` };

  async function load() {
    const p = await fetch("/api/projects").then((r) => r.json());
    setProjects(p);
    const l = await fetch("/api/contact", { headers: H });
    if (l.ok) setLeads(await l.json());
  }

  async function login(e) {
    e.preventDefault();
    const test = await fetch("/api/contact", { headers: { Authorization: `Bearer ${pw}` } });
    if (test.ok) { setAuthed(true); load(); }
    else setMsg("Wrong password.");
  }

  async function save(e) {
    e.preventDefault();
    setMsg("Saving…");
    const url = editing ? `/api/projects/${editing}` : "/api/projects";
    const res = await fetch(url, { method: editing ? "PUT" : "POST", headers: H, body: JSON.stringify(form) });
    const d = await res.json();
    if (res.ok) { setMsg(editing ? "Project updated." : "Project added."); setForm(empty); setEditing(null); load(); }
    else setMsg(d.error || "Save failed.");
  }

  async function del(id) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE", headers: H });
    load();
  }

  if (!authed) {
    return (
      <main className="wrap" style={{ paddingTop: 160, maxWidth: 420, minHeight: "70vh" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 20 }}>Admin login</h1>
        <form className="admin" style={{ gridTemplateColumns: "1fr" }} onSubmit={login}>
          <input type="password" placeholder="Admin password" value={pw} onChange={(e) => setPw(e.target.value)} required />
          <button className="btn btn-grad" style={{ justifyContent: "center" }}>Sign in</button>
          {msg && <p style={{ color: "var(--magenta)" }}>{msg}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="wrap" style={{ paddingTop: 130, paddingBottom: 80, minHeight: "80vh" }}>
      <h1 style={{ fontSize: "2.2rem", marginBottom: 8 }}>Content admin</h1>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>Add projects and read contact-form leads without touching code.</p>
      <div className="filters">
        <button className={tab === "projects" ? "on" : ""} onClick={() => setTab("projects")}>Projects ({projects.length})</button>
        <button className={tab === "leads" ? "on" : ""} onClick={() => { setTab("leads"); load(); }}>Leads ({leads.length})</button>
      </div>

      {tab === "projects" && (
        <>
          <form className="admin" onSubmit={save}>
            <input placeholder="Project title *" value={form.t} onChange={(e) => setForm({ ...form, t: e.target.value })} required />
            <select value={form.c} onChange={(e) => setForm({ ...form, c: e.target.value })}>
              {CATS.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input placeholder="Client" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
            <input placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
            <input placeholder="Tools (e.g. Figma · After Effects)" value={form.tools} onChange={(e) => setForm({ ...form, tools: e.target.value })} />
            <input placeholder="Cover image URL (optional)" value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} />
            <textarea placeholder="The brief" value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} />
            <textarea placeholder="Process" value={form.process} onChange={(e) => setForm({ ...form, process: e.target.value })} />
            <textarea placeholder="Result" value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })} />
            <button className="btn btn-grad full" style={{ justifyContent: "center" }}>{editing ? "Update project" : "Add project"}</button>
            {editing && <button type="button" className="btn btn-ghost full" style={{ justifyContent: "center" }} onClick={() => { setEditing(null); setForm(empty); }}>Cancel editing</button>}
            {msg && <p className="full" style={{ color: "var(--amber)" }}>{msg}</p>}
          </form>

          <div style={{ marginTop: 40, overflowX: "auto" }}>
            <table className="admin-table">
              <thead><tr><th>Title</th><th>Category</th><th>Year</th><th></th></tr></thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id}>
                    <td>{p.t}</td><td>{p.c}</td><td>{p.year}</td>
                    <td>
                      <button className="btn btn-ghost sm" onClick={() => { setForm({ ...empty, ...p }); setEditing(p.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Edit</button>
                      <button className="btn btn-ghost sm" onClick={() => del(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "leads" && (
        <div style={{ overflowX: "auto" }}>
          {leads.length === 0 && <p style={{ color: "var(--muted)" }}>No leads yet. Submissions from the contact form appear here.</p>}
          {leads.length > 0 && (
            <table className="admin-table">
              <thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Phone</th><th>Message</th></tr></thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td>{new Date(l.createdAt).toLocaleDateString()}</td>
                    <td>{l.name}</td><td>{l.email}</td><td>{l.phone}</td>
                    <td style={{ maxWidth: 380 }}>{l.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </main>
  );
}
