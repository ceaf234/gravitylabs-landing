import { Button } from '../Button';
import { Container } from '../layout';
import ScrollIndicator from '../ScrollIndicator';
import { TypewriterText } from '../TypewriterText';

function HeroSection() {
  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="hero-headline"
      className="dot-wave relative flex min-h-[85vh] flex-col items-start justify-center overflow-hidden bg-background pt-16 pb-6 lg:min-h-[75vh] lg:pt-20 lg:pb-10"
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
              text="Hacemos crecer tu negocio con tecnología."
              speed={40}
              pauseAfterPunctuation={300}
              startDelay={300}
              keepCaretAfterComplete={true}
            />
          </h1>

          {/* Subheadline Paragraph - Muted text with max-width for readability */}
          <p className="mb-8 max-w-[60ch] text-sm leading-[1.6] text-text-muted sm:text-base md:mb-10 2xl:text-lg 2xl:mb-12 3xl:mb-14 4xl:text-xl">
            Diseñamos y desarrollamos software e inteligencia artificial para modernizar y
            automatizar tu operación.
          </p>

          {/* CTA Buttons - Primary and secondary actions with responsive scaling */}
          <div
            role="group"
            aria-label="Acciones principales"
            className="flex flex-col gap-4 sm:flex-row sm:gap-5 2xl:gap-6"
          >
            <Button variant="primary" href="#contacto" className="w-full sm:w-auto">
              Agenda tu llamada
            </Button>
            <Button variant="secondary" href="#servicios" className="w-full sm:w-auto">
              Nuestros servicios
            </Button>
          </div>
        </article>
      </Container>

      {/* Scroll Indicator - Responsive positioning with ARIA label */}
      <ScrollIndicator />
    </main>
  );
}

export default HeroSection;
