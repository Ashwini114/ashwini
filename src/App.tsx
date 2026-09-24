import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import ShaderBackground from "./components/ShaderBackground";
import ZoomScene from "./components/ZoomScene";

export default function App() {
  return (
    <>
      <ShaderBackground />
      <Nav />
      <main>
        <Hero />
        <ZoomScene />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}
