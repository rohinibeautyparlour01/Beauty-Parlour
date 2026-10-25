import useScrollSpy from './hooks/useScrollSpy';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import Bridal from './components/Bridal';
import Gallery from './components/Gallery';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Chatbot from './components/Chatbot';

const IDS = ['home', 'services', 'bridal', 'gallery', 'about', 'faq', 'contact'];

export default function App() {
  const { active, scrolled } = useScrollSpy(IDS);
  return (
    <>
      <Navbar active={active} scrolled={scrolled} />
      <main>
        <Hero />
        <Features />
        <Services />
        <Bridal />
        <Gallery />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Chatbot />
    </>
  );
}
