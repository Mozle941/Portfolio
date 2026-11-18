export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role?: string;
  initials: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "david-chen",
    quote: "Moses set up a remarkably solid backend architecture using Python and Docker. His implementation of PostgreSQL with Redis caching on our URL shortener project proved he truly understands performance and scaling.",
    author: "David Chen",
    role: "Lead Backend Engineer",
    initials: "DC",
    rating: 5,
  },
  {
    id: "anonymous-user",
    quote: "I used the Album__Wall app to generate wallpapers for my entire device ecosystem, and it worked flawlessly without any weird cropping. Great attention to detail on the UI and padding logic!",
    author: "Anonymous User",
    initials: "AU",
    rating: 4,
  },
  {
    id: "aris-thorne",
    quote: "As a student developer, Moses is already tackling complex architectural challenges. His work on simulating network partitions and exploring CP/AP trade-offs in distributed systems shows deep technical curiosity.",
    author: "Dr. Aris Thorne",
    role: "Computer Science Professor",
    initials: "AT",
    rating: 5,
  },
  {
    id: "sarah-jenkins",
    quote: "We needed an e-commerce landing page deployed quickly, and Moses delivered a clean, responsive site hosted securely on Vercel. The deployment documentation was incredibly thorough.",
    author: "Sarah Jenkins",
    role: "Startup Founder",
    initials: "SJ",
    rating: 5,
  },
  {
    id: "marcus-r",
    quote: "Great foundational skills in DevOps and Cloud engineering. He's proactive, understands containerization well, but occasionally needs a bit of guidance on advanced C++ concepts. Still, an excellent addition to any engineering team.",
    author: "Marcus R.",
    role: "Senior Cloud Architect",
    initials: "MR",
    rating: 4,
  },
];
