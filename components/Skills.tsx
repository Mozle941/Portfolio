import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section-shell content-section skills-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">The toolkit <span className="eyebrow-divider">/</span> 02</p>
          <h2>Skills<span className="hero-period" aria-hidden="true">.</span></h2>
        </div>
        <p className="section-aside">Tools I use to turn<br />ideas into working things.</p>
      </div>
      <div className="skills-grid">
        {skillGroups.map((g, index) => (
          <div className="skill-group" key={g.label}>
            <div className="skill-group-heading">
              <span className="skill-index">0{index + 1}</span>
              <h3>{g.label}</h3>
              <ul className="skill-list">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
