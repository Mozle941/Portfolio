const links = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Main"
        className="group flex items-center rounded-full border border-line bg-surface px-5 py-3 shadow-lg transition-all"
      >
        <a href="#top" className="font-heading font-semibold text-text">
          Mos_dev
        </a>
        <ul className="flex items-center gap-5 overflow-hidden pl-5 text-sm text-muted transition-all duration-300 md:max-w-0 md:pl-0 md:opacity-0 md:group-focus-within:max-w-xs md:group-focus-within:pl-5 md:group-focus-within:opacity-100 md:group-hover:max-w-xs md:group-hover:pl-5 md:group-hover:opacity-100">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-text">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
