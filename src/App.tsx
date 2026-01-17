import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { ContactModal } from './components/ContactModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header />
      <HeroSection onOpenModal={openModal} />
      <ServicesSection />
      <ContactSection />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default App;
