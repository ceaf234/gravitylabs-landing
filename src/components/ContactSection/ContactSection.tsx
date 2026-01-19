import { DottedWaveBackground } from '../backgrounds';
import { ContactForm } from '../ContactForm';
import { Container } from '../layout';

/**
 * ContactSection displays a two-column layout with intro card and contact form.
 * Features:
 * - Left column: compact intro card with eyebrow, title, description
 * - Right column: contact form in a larger card
 * - 12-column grid (4+8) on desktop, stacked on mobile
 * - Anchor target for #contacto navigation
 *
 * @example
 * ```tsx
 * <ContactSection />
 * ```
 */
function ContactSection() {
  return (
    <DottedWaveBackground
      as="section"
      id="contacto"
      aria-labelledby="contact-heading"
      className="w-full scroll-mt-24 bg-background py-16 lg:py-24"
      brightnessBoost={1.3}
    >
      <Container>
        {/* 12-column grid: 4 cols left, 8 cols right - items-stretch for equal height on desktop */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          {/* Left Intro Card - 4 columns */}
          <div className="lg:col-span-4 lg:h-full">
            <div className="h-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] lg:p-10">
              {/* Eyebrow */}
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/50">
                Contacto
              </p>

              {/* Title */}
              <h2
                id="contact-heading"
                className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
              >
                Cuéntanos qué necesitas.
              </h2>

              {/* Description */}
              <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-white/70 sm:text-base">
                Completa el formulario y te responderemos en menos de 24 horas con ideas claras
                para tu proyecto.
              </p>
            </div>
          </div>

          {/* Right Form Card - 8 columns */}
          <div className="lg:col-span-8 lg:h-full">
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-10">
              <ContactForm showCard={false} />
            </div>
          </div>
        </div>
      </Container>
    </DottedWaveBackground>
  );
}

export default ContactSection;
