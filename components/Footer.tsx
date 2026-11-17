const links = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8 text-sm text-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p>Mos_dev</p>
        <nav aria-label="Footer">
          <ul className="flex gap-5">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-text">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
