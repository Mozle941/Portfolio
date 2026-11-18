import BrandMark from "./BrandMark";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner section-shell">
        <p className="footer-wordmark"><BrandMark className="footer-brand-mark" size={28} /> Mos_dev</p>
        <nav aria-label="Footer">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="back-to-top" href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
