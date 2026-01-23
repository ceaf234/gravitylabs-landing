import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import SloganSection from './components/SloganSection';
import TeamSection from './components/TeamSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header />
      <HeroSection onOpenModal={openModal} />
      <ServicesSection />
      <SloganSection />
      <TeamSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default App;
