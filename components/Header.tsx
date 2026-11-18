import BrandMark from "./BrandMark";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="site-header sticky top-0 z-50">
      <nav aria-label="Main" className="site-nav group">
        <a href="#top" className="wordmark" aria-label="Mos_dev, back to top">
          <BrandMark className="wordmark-mark" size={32} />
          <span>Mos_dev</span>
        </a>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
