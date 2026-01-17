import { ContactForm } from '../ContactForm';
import { Container } from '../layout';

/**
 * ContactSection displays the contact form in a dedicated page section.
 * Features:
 * - Centered form card that fits within one screen on desktop
 * - Compact header with eyebrow and headline
 * - Anchor target for #contacto navigation
 *
 * @example
 * ```tsx
 * <ContactSection />
 * ```
 */
function ContactSection() {
  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      className="bg-background py-16 md:py-20 lg:py-24"
    >
      <Container>
        {/* Centered content */}
        <div className="mx-auto max-w-3xl">
          {/* Section Header - Compact */}
          <div className="mb-8 text-center">
            {/* Eyebrow Text */}
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-eyebrow">
              Contacto
            </p>

            {/* Section Headline */}
            <h2
              id="contact-heading"
              className="mb-4 text-2xl font-bold leading-tight text-text-primary md:text-3xl"
            >
              Hablemos sobre tu proyecto
            </h2>

            {/* Description */}
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-text-muted md:text-base">
              Cuéntanos sobre tu negocio y tus objetivos. Te contactaremos para explorar cómo
              podemos ayudarte.
            </p>
          </div>

          {/* Contact Form with card wrapper included */}
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

export default ContactSection;
