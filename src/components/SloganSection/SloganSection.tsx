import { DottedWaveBackground } from '../backgrounds';
import { Container } from '../layout';
import { PersonPlaceholder } from '../PersonPlaceholder';

/**
 * SloganSection displays the company's value proposition with a two-column layout.
 * Features a text block on the left and a person placeholder icon on the right.
 *
 * Features:
 * - Dotted wave background consistent with other sections
 * - Transparent text block (no glass frame) for direct background visibility
 * - Person placeholder icon in glass container on right
 * - Two-column layout on desktop, stacked on mobile
 * - Anchor target for #nosotros navigation
 * - Spanish copy for Guatemalan SMBs
 *
 * @example
 * ```tsx
 * <SloganSection />
 * ```
 */
function SloganSection() {
  return (
    <DottedWaveBackground
      as="section"
      id="nosotros"
      aria-labelledby="slogan-heading"
      className="bg-background px-4 py-section md:px-6 lg:px-8 2xl:px-12 3xl:px-16 4xl:px-20"
      brightnessBoost={1.3}
    >
      <Container>
        {/* Two-column grid: text left, image right - stacked on mobile */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12 2xl:gap-16">
          {/* Left Text Block - transparent, no glass frame */}
          <div className="order-1 lg:order-1">
            <div className="p-8 md:p-10 lg:p-12 2xl:p-14 3xl:p-16">
              {/* Eyebrow */}
              <p className="mb-4 text-eyebrow font-medium uppercase tracking-[0.2em] text-text-eyebrow 2xl:mb-6">
                En Gravity Labs
              </p>

              {/* Headline - subtle text shadow for readability */}
              <h2
                id="slogan-heading"
                className="mb-4 text-display-md font-bold leading-[1.1] text-text-primary md:mb-6 2xl:mb-8"
                style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}
              >
                Un equipo pequeño que entrega como uno grande.
              </h2>

              {/* Subheadline */}
              <p className="mb-6 max-w-[50ch] text-card-body leading-relaxed text-text-muted md:mb-8 2xl:mb-10">
                No tienes que ser experto en software. Nosotros nos encargamos de lo técnico, tú te
                enfocas en tu negocio.
              </p>

              {/* Micro CTA Link */}
              <a
                href="#equipo"
                className="inline-flex items-center text-sm font-medium text-accent-gold transition-colors hover:text-accent-gold-hover focus-visible:rounded-sm 2xl:text-base"
              >
                Conoce al equipo
                <span className="ml-1" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right Portrait Placeholder - constrained to 70% of original size */}
          <div className="order-2 flex justify-center lg:order-2 lg:justify-end">
            <div className="w-[70%] max-w-xs rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] md:max-w-sm md:p-4 2xl:max-w-md 2xl:rounded-3xl 2xl:p-6">
              {/* Person icon placeholder - same as Team cards */}
              <PersonPlaceholder
                aspectRatio="aspect-[4/5]"
                className="rounded-xl 2xl:rounded-2xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </DottedWaveBackground>
  );
}

export default SloganSection;
