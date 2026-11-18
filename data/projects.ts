export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  details: string[];
  repoUrl?: string;
  liveUrl?: string;
};

const gh = (name: string) => `https://github.com/Mozle941/${name}`;

export const projects: Project[] = [
  {
    slug: "album-wall",
    title: "Album__Wall",
    summary: "Creates device wallpapers from images you own or are licensed to use.",
    tags: ["TypeScript", "CSS", "Vercel"],
    details: [
      "Create wallpapers for iOS, Android, macOS, Windows, and Linux.",
      "Preview images at selected device dimensions and download each result as a ZIP.",
      "Preserve image proportions with padding or edge extension instead of cropping.",
    ],
    repoUrl: gh("Album__Wall"),
    liveUrl: "https://albumwall-lemon.vercel.app",
  },
  {
    slug: "url-shortener",
    title: "url_shortener",
    summary: "A Flask URL shortener backed by PostgreSQL and Redis, containerized with Docker Compose.",
    tags: ["Python", "Docker", "PostgreSQL", "Redis"],
    details: [
      "Create short codes and redirect visitors to the original URLs through a Flask API.",
      "Store URL mappings in PostgreSQL and cache frequent lookups in Redis.",
      "Run the API, database, and cache together with Docker Compose.",
    ],
    repoUrl: gh("url_shortener"),
  },
  {
    slug: "e-commerce-web-app-development",
    title: "e-commerce-web-app-development",
    summary: "An AI-generated e-commerce landing page deployed to Vercel.",
    tags: ["TypeScript", "CSS", "Vercel"],
    details: [
      "Scaffolded with v0, then reviewed and refined before deployment.",
      "Hosted on Vercel with automatic HTTPS and edge protection.",
      "The repository documents both dashboard and Vercel CLI deployment steps.",
    ],
    repoUrl: gh("e-commerce-web-app-development"),
    liveUrl: "https://e-commerce-web-app-development-alpha.vercel.app",
  },
  {
    slug: "distributed-system",
    title: "distributed-system",
    summary: "A distributed key-value store exploring replication, partitions, and CP/AP trade-offs.",
    tags: ["Python", "Flask", "Docker"],
    details: [
      "Replicate writes across three nodes in CP mode.",
      "Simulate network partitions and compare CP write rejection with AP availability.",
      "Use last-write-wins to resolve conflicting values after a partition heals.",
    ],
    repoUrl: gh("distributed-system"),
  },
];
