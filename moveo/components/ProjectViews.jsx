"use client";
import { useState } from "react";

const grads = [
  "linear-gradient(135deg,#3B1E4F,#FF3D8A)","linear-gradient(135deg,#1E2A4F,#3AC7FF)",
  "linear-gradient(135deg,#4F2E1E,#FFB43A)","linear-gradient(135deg,#173B2E,#3AFFB4)",
  "linear-gradient(135deg,#3F1E1E,#FF6A3A)","linear-gradient(135deg,#231E4F,#B44BFF)",
  "linear-gradient(135deg,#4F1E39,#FF3D5C)","linear-gradient(135deg,#1E3D4F,#5CD6FF)",
];
const bg = (p, i) => (p.cover ? `url(${p.cover})` : grads[i % grads.length]);

export function CaseModal({ projects, index, setIndex }) {
  if (index === null) return null;
  const p = projects[index];
  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && setIndex(null)}>
      <div className="modal-in">
        <button className="close" onClick={() => setIndex(null)} aria-label="Close">×</button>
        <span className="tag">{p.c}</span>
        <h2 style={{ fontSize: "2.2rem", marginTop: 10 }}>{p.t}</h2>
        <div className="cover" style={{ background: bg(p, index) }}>{!p.cover && p.t}</div>
        <div className="mrow">
          <div><b>Client</b>{p.client}</div>
          <div><b>Year</b>{p.year}</div>
          <div><b>Tools</b>{p.tools}</div>
        </div>
        <h3>The brief</h3><p style={{ color: "var(--muted)", marginBottom: 20 }}>{p.brief}</p>
        <h3>Process</h3><p style={{ color: "var(--muted)", marginBottom: 20 }}>{p.process}</p>
        <h3>Result</h3><p style={{ color: "var(--muted)" }}>{p.result}</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
          <button className="btn btn-ghost" onClick={() => setIndex((index - 1 + projects.length) % projects.length)}>← Previous</button>
          <button className="btn btn-ghost" onClick={() => setIndex((index + 1) % projects.length)}>Next →</button>
        </div>
      </div>
    </div>
  );
}

export function WorkScroll({ projects }) {
  const [index, setIndex] = useState(null);
  return (
    <>
      <div className="hscroll">
        {projects.slice(0, 6).map((p, i) => (
          <div key={p.id} className="work-card" onClick={() => setIndex(i)}>
            <div className="thumb" style={{ background: bg(p, i) }} />
            <div className="meta"><span className="tag">{p.c}</span><h3>{p.t}</h3></div>
          </div>
        ))}
      </div>
      <CaseModal projects={projects} index={index} setIndex={setIndex} />
    </>
  );
}

const CATS = ["All","Branding & Logo","Print & Brochure","Social Media Design","Video Editing","Motion Graphics","Packaging","UI-UX"];

export function PortfolioGrid({ projects }) {
  const [cat, setCat] = useState("All");
  const [index, setIndex] = useState(null);
  const shown = projects.filter((p) => cat === "All" || p.c === cat);
  return (
    <>
      <div className="filters">
        {CATS.map((c) => (
          <button key={c} className={c === cat ? "on" : ""} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div className="pgrid">
        {shown.map((p) => {
          const i = projects.indexOf(p);
          return (
            <div key={p.id} className="pitem" onClick={() => setIndex(i)}>
              <div className="bg" style={{ background: bg(p, i) }}>{!p.cover && p.t}</div>
              <div className="ol"><span className="tag">{p.c}</span><h3 style={{ fontSize: "1.15rem" }}>{p.t}</h3></div>
            </div>
          );
        })}
      </div>
      <CaseModal projects={projects} index={index} setIndex={setIndex} />
    </>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState("");
  async function submit(e) {
    e.preventDefault();
    setStatus("Sending…");
    const f = Object.fromEntries(new FormData(e.target));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    if (res.ok) { setStatus("Message sent. We'll reply within 24 hours."); e.target.reset(); }
    else { const d = await res.json().catch(() => ({})); setStatus(d.error || "Something went wrong — try WhatsApp instead."); }
  }
  return (
    <form className="contact" onSubmit={submit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="phone" placeholder="Phone / WhatsApp" />
      <input name="company" placeholder="Company" />
      <textarea name="message" placeholder="Tell us about your project" required />
      <button className="btn btn-grad full" type="submit" style={{ justifyContent: "center" }}>Send message</button>
      {status && <p className="full" style={{ color: "var(--amber)" }}>{status}</p>}
    </form>
  );
}
