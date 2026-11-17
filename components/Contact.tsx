const email = "mose_dev@proton.me";
const linkClass = "text-2xl font-medium text-text underline decoration-line underline-offset-8 hover:decoration-accent";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="mb-10 font-heading text-4xl font-bold text-text">Contact</h2>
      <ul className="flex flex-col gap-4">
        <li>
          <a href={`mailto:${email}`} className={linkClass}>
            {email}
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Mozle941"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
        </li>
      </ul>
    </section>
  );
}
