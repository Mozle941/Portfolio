import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";

export default function Page() {
  return (
    <main id="top">
      <Hero />
      <Projects />
      <Testimonials />
      <Skills />
      <Contact />
    </main>
  );
}
