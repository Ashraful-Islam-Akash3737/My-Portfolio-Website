import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SpotlightBackground from "@/components/SpotlightBackground";
import StarryBackground from "@/components/StarryBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Leadership from "@/components/Leadership";
import Education from "@/components/Education";
import Process from "@/components/Process";
import Advantages from "@/components/Advantages";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Global fixed background layers */}
      <StarryBackground />
      <SpotlightBackground />
      
      {/* Page chrome */}
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      
      {/* Main content - all sections float above the global background */}
      <main id="home" className="flex-1 w-full transition-colors duration-300 relative" style={{ zIndex: 1 }}>
        <Hero />
        <About />
        <Services />
        <TechStack />
        <Experience />
        <Projects />
        <Leadership />
        <Education />
        <Process />
        <Advantages />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}
