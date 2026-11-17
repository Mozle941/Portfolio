export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { label: "Languages", items: ["Python", "C++", "HTML5", "CSS3"] },
  { label: "Styling", items: ["Tailwind CSS"] },
  { label: "Data", items: ["PostgreSQL", "Redis"] },
  {
    label: "Tools & platforms",
    items: ["Git", "GitHub", "Vercel", "Linux", "VS Code"],
  },
];
