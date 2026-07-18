import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Moveo Studio — We Build Brands That Move People",
  description:
    "Full-service digital marketing & creative studio: branding, video, motion, web, social, SEO and ads. Portfolio of Vishnu B Nair.",
};

export default function RootLayout({ children }) {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP || "971500000000";
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <nav>
          <div className="wrap nav-in">
            <Link className="logo" href="/">moveo<em>.</em></Link>
            <div className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/#services">Services</Link>
              <Link href="/#work">Work</Link>
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/#contact">Contact</Link>
            </div>
            <a className="btn btn-grad sm" href={`https://wa.me/${wa}`} target="_blank">Get a Free Quote</a>
          </div>
        </nav>
        {children}
        <footer>
          <div className="wrap foot">
            <div>
              <span className="logo">moveo<em>.</em></span>
              <p style={{ marginTop: 8 }}>Digital marketing & creative studio.</p>
            </div>
            <div>© 2026 Moveo Studio · Vishnu B Nair</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
