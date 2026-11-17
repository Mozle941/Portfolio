export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
};

const gh = (name: string) => `https://github.com/Mozle941/${name}`;

export const projects: Project[] = [
  {
    slug: "polybot-latency",
    title: "POLYBOT_LATENCY",
    summary: "A cutting edge market analysis and execution tool",
    tags: ["Python"],
    repoUrl: gh("POLYBOT_LATENCY"),
  },
  {
    slug: "my-polybot",
    title: "My_Polybot",
    summary: "A bot for copy trading on prediction markets",
    tags: ["Python"],
    repoUrl: gh("My_Polybot"),
  },
  {
    slug: "hostel-management-system",
    title: "hostel-management-system",
    summary: "A program written in C++ for property management",
    tags: ["C++"],
    repoUrl: gh("hostel-management-system"),
  },
  {
    slug: "url-shortener",
    title: "url_shortener",
    summary: "A URL shortener built to learn Docker, PostgreSQL and Redis",
    tags: ["Docker", "PostgreSQL", "Redis"],
    repoUrl: gh("url_shortener"),
  },
  {
    slug: "pdf-audio",
    title: "PDF-Audio",
    summary: "PDF-Audio (Python)",
    tags: ["Python"],
    repoUrl: gh("PDF-Audio"),
  },
  {
    slug: "login-page",
    title: "Login-Page",
    summary: "Login-Page (HTML)",
    tags: ["HTML"],
    repoUrl: gh("Login-Page"),
  },
  {
    slug: "git-learning-log",
    title: "git-learning-log",
    summary: "My first Git project tracking a learning log",
    tags: ["Git"],
    repoUrl: gh("git-learning-log"),
  },
];
