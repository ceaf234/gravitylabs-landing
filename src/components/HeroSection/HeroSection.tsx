import { Button } from '../Button';
import { DottedWaveBackground } from '../backgrounds';
import { Container } from '../layout';
import ScrollIndicator from '../ScrollIndicator';
import { TypewriterText } from '../TypewriterText';

export interface HeroSectionProps {
  /** Callback to open the contact modal */
  onOpenModal?: () => void;
}

function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <DottedWaveBackground
      as="main"
      id="hero"
      data-section="hero"
      role="main"
      aria-labelledby="hero-headline"
      className="flex min-h-[85vh] flex-col items-start justify-center overflow-hidden bg-background pt-16 pb-6 lg:min-h-[75vh] lg:pt-20 lg:pb-10"
      brightnessBoost={1.3}
    >
      {/* Hero Content - Uses shared Container for alignment with navbar */}
      <Container className="relative z-10">
        <article className="w-full">
          {/* Main Headline - Massive bold geometric sans with typing effect
              ~5× larger on very large screens using inline clamp() */}
          <h1
            id="hero-headline"
            className="mb-6 font-display font-extrabold leading-[0.95] tracking-tight text-white md:mb-8 2xl:mb-10 3xl:mb-12 4xl:mb-14"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 10.5rem)' }}
          >
            <TypewriterText
              text="Software profesional para llevar tu empresa al siguiente nivel."
              speed={52}
              pauseAfterPunctuation={390}
              startDelay={390}
              keepCaretAfterComplete={true}
            />
          </h1>

          {/* Subheadline Paragraph - Muted text with max-width for readability */}
          <p className="mb-8 max-w-[60ch] text-sm leading-[1.6] text-text-muted sm:text-base md:mb-10 2xl:text-lg 2xl:mb-12 3xl:mb-14 4xl:text-xl">
            Creamos sistemas a medida que automatizan tu operación — desde ventas en línea hasta
            procesos internos con IA.
          </p>

          {/* CTA Buttons - Primary and secondary actions with responsive scaling */}
          <div
            role="group"
            aria-label="Acciones principales"
            className="flex flex-col gap-4 sm:flex-row sm:gap-5 2xl:gap-6"
          >
            {onOpenModal ? (
              <Button variant="primary" onClick={onOpenModal} className="w-full sm:w-auto">
                Agenda una consulta gratis
              </Button>
            ) : (
              <Button variant="primary" href="#contacto" className="w-full sm:w-auto">
                Agenda una consulta gratis
              </Button>
            )}
            <Button variant="secondary" href="#servicios" className="w-full sm:w-auto">
              Cómo te ayudamos
            </Button>
          </div>
        </article>
      </Container>

      {/* Scroll Indicator - Responsive positioning with ARIA label */}
      <ScrollIndicator />
    </DottedWaveBackground>
  );
}

export default HeroSection;
