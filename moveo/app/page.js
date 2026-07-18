import Link from "next/link";
import { readJSON } from "@/lib/db";
import { WorkScroll, ContactForm } from "@/components/ProjectViews";

export const dynamic = "force-dynamic"; // always read fresh CMS data

export default async function Home() {
  const projects = await readJSON("projects.json", []);
  const wa = process.env.NEXT_PUBLIC_WHATSAPP || "971500000000";
  const clients = ["AURAVEDA","NORTHPEAK REALTY","KAAPI CO.","FLUXPAY","ORBIT FITNESS","MARHABA FOODS","ZENLAYER","LUMEN CLINIC"];

  return (
    <main>
      <header className="hero">
        <div className="hero-orb orb1" /><div className="hero-orb orb2" />
        <div className="wrap">
          <p className="eyebrow">Digital Marketing & Creative Studio · Dubai</p>
          <h1>We build brands that <span className="grad-text">move people.</span></h1>
          <p className="lede">Branding, motion, web and growth marketing under one roof. Strategy-led creative that turns attention into revenue — not just likes.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a className="btn btn-grad" href="#work">See our work ↗</a>
            <Link className="btn btn-ghost" href="/portfolio">Vishnu's portfolio</Link>
          </div>
        </div>
        <div className="marquee"><div className="marquee-track">
          {[...clients, ...clients].map((c, i) => <span key={i}>{c}</span>)}
        </div></div>
      </header>

      <section>
        <div className="wrap bento">
          <div className="cell"><div className="num grad-text">240+</div><div className="lbl">Projects completed</div></div>
          <div className="cell"><div className="num grad-text">95+</div><div className="lbl">Happy clients</div></div>
          <div className="cell"><div className="num grad-text">12</div><div className="lbl">Creative specialists</div></div>
          <div className="cell"><div className="num grad-text">9</div><div className="lbl">Countries served</div></div>
        </div>
      </section>

      <section id="services" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow">What we do</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3.4rem)", marginBottom: 44 }}>Full-service, no hand-offs.</h2>
          <div className="svc-grid">
            <div className="svc wide"><div className="ico">✦</div><h3>Branding & Identity</h3><p>Naming, logo systems, brand guidelines and visual worlds that make you unmistakable.</p></div>
            <div className="svc"><div className="ico">▶</div><h3>Video Production & Animation</h3><p>Showreels, product films, 2D/3D motion graphics and edits built for retention.</p></div>
            <div className="svc"><div className="ico">◧</div><h3>Web Design & Development</h3><p>Fast, conversion-focused sites on modern stacks — no bloated templates.</p></div>
            <div className="svc"><div className="ico">✳</div><h3>Social Media Marketing</h3><p>Content calendars, design systems and community growth that compounds.</p></div>
            <div className="svc"><div className="ico">◎</div><h3>SEO & Google Ads</h3><p>Search visibility and paid campaigns measured in leads, not impressions.</p></div>
            <div className="svc"><div className="ico">▤</div><h3>Company Profiles & Print</h3><p>Pitch decks, brochures and profiles that close rooms before you speak.</p></div>
          </div>
        </div>
      </section>

      <section id="work" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className="wrap">
          <p className="eyebrow">Featured work</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3.4rem)", marginBottom: 34 }}>Case studies, not just logos.</h2>
        </div>
        <WorkScroll projects={projects} />
      </section>

      <section style={{ background: "var(--bg2)" }}>
        <div className="wrap meet">
          <div className="avatar">VB</div>
          <div>
            <p className="eyebrow">Meet the founder</p>
            <h2 style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}>Vishnu B Nair</h2>
            <p style={{ color: "var(--muted)", margin: "18px 0 28px", maxWidth: "48ch" }}>
              Graphic designer and motion & brand storyteller. Vishnu leads every project's creative direction — from first sketch to final frame.
            </p>
            <Link className="btn btn-grad" href="/portfolio">View full portfolio →</Link>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <p className="eyebrow">Contact</p>
          <h2 style={{ fontSize: "clamp(2rem,4.5vw,3rem)" }}>Let's talk.</h2>
          <ContactForm />
          <p style={{ color: "var(--muted)", marginTop: 20, fontSize: ".9rem" }}>
            Or reach us on <a href={`https://wa.me/${wa}`} style={{ color: "var(--amber)" }}>WhatsApp</a>
          </p>
        </div>
      </section>
    </main>
  );
}
