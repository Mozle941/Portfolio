import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="mb-10 font-heading text-4xl font-bold text-text">Skills</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((g) => (
          <div key={g.label} className="rounded-[2rem] border border-line p-6">
            <h3 className="mb-4 font-heading text-xl font-semibold text-text">{g.label}</h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li key={item} className="rounded-full bg-surface px-4 py-1.5 text-sm text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
