import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { AITools } from "@/components/portfolio/AITools";
import { Contact } from "@/components/portfolio/Contact";
import { Certificates } from "@/components/portfolio/Certificates";
import { Footer } from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Projects />
        <AITools />
        <Certificates />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
