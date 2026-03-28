import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Career } from "@/components/sections/career";
import { Education } from "@/components/sections/education";
import { Projects } from "@/components/sections/projects";
import { More } from "@/components/sections/more";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Career />
        <Education />
        <Projects />
        <More />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
