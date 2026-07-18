import { readJSON } from "@/lib/db";
import { PortfolioGrid } from "@/components/ProjectViews";

export const dynamic = "force-dynamic";
export const metadata = { title: "Portfolio — Vishnu B Nair" };

export default async function Portfolio() {
  const projects = await readJSON("projects.json", []);
  const wa = process.env.NEXT_PUBLIC_WHATSAPP || "971500000000";
  const skills = ["Photoshop","Illustrator","After Effects","Premiere Pro","Figma","Cinema 4D","DaVinci Resolve"];

  return (
    <main>
      <header className="pf-hero wrap">
        <p className="eyebrow">Portfolio</p>
        <h1>Vishnu <span className="grad-text">B Nair</span></h1>
        <p style={{ color: "var(--muted)", fontSize: "1.2rem", marginTop: 18, maxWidth: "56ch" }}>
          Graphic Designer · Motion & Brand Storyteller. I design identities, edit films and animate stories that make brands impossible to ignore.
        </p>
        <div className="chips">{skills.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
      </header>

      <section>
        <div className="wrap">
          <PortfolioGrid projects={projects} />
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-banner">
            <h2>Like what you see?</h2>
            <p style={{ marginTop: 10, opacity: 0.85 }}>Let's create something together.</p>
            <a className="btn" href={`https://wa.me/${wa}`} target="_blank">Start a project</a>
          </div>
        </div>
      </section>
    </main>
  );
}
