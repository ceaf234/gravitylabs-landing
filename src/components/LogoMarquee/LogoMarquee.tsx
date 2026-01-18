/**
 * Placeholder logo data for the marquee
 * These are temporary placeholders until real client logos are added
 */
const placeholderLogos = [
  { name: 'Google', text: 'Google' },
  { name: 'Microsoft', text: 'Microsoft' },
  { name: 'Amazon', text: 'Amazon' },
  { name: 'Shopify', text: 'Shopify' },
  { name: 'Stripe', text: 'Stripe' },
  { name: 'Uber', text: 'Uber' },
  { name: 'Airbnb', text: 'Airbnb' },
  { name: 'Netflix', text: 'Netflix' },
  { name: 'Meta', text: 'Meta' },
  { name: 'Apple', text: 'Apple' },
];

/**
 * Individual logo item component
 * Renders as a pill/chip with consistent styling
 */
function LogoItem({ name, text }: { name: string; text: string }) {
  return (
    <div
      className="flex h-[73px] items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 opacity-60 transition-all duration-300 hover:opacity-100 hover:scale-105 md:h-[88px] md:px-10 lg:h-[104px] lg:px-12 2xl:h-[117px] 2xl:px-14"
      aria-label={name}
    >
      <span className="text-base font-medium tracking-wide text-white/90 md:text-lg lg:text-xl 2xl:text-2xl">
        {text}
      </span>
    </div>
  );
}

/**
 * Static grid fallback for reduced motion preference
 * Displays logos in a responsive grid instead of animated marquee
 */
function StaticLogoGrid() {
  return (
    <div
      className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-8"
      role="list"
      aria-label="Logos de empresas placeholder"
    >
      {placeholderLogos.map((logo) => (
        <div key={logo.name} role="listitem">
          <LogoItem {...logo} />
        </div>
      ))}
    </div>
  );
}

/**
 * Animated marquee row component
 * Renders logos twice for seamless infinite loop
 */
function MarqueeRow() {
  // Duplicate logos for seamless infinite loop
  const allLogos = [...placeholderLogos, ...placeholderLogos];

  return (
    <div
      className="marquee-track flex gap-8 md:gap-10 lg:gap-12 2xl:gap-14"
      aria-hidden="true"
    >
      {allLogos.map((logo, index) => (
        <LogoItem key={`${logo.name}-${index}`} {...logo} />
      ))}
    </div>
  );
}

export interface LogoMarqueeProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * LogoMarquee displays an infinite scrolling carousel of placeholder logos.
 *
 * Features:
 * - Smooth CSS-based infinite scroll animation
 * - Fade masks on left/right edges for smooth entry/exit
 * - Pauses on hover (desktop)
 * - Respects prefers-reduced-motion (shows static grid instead)
 * - Fully accessible with proper ARIA attributes
 *
 * @example
 * ```tsx
 * <LogoMarquee />
 * ```
 */
function LogoMarquee({ className = '' }: LogoMarqueeProps) {
  return (
    <div className={className}>
      {/* Static grid for reduced motion - hidden by default, shown via CSS */}
      <div className="hidden motion-reduce:block">
        <StaticLogoGrid />
      </div>

      {/* Animated marquee - hidden when reduced motion is preferred */}
      <div
        className="marquee-container relative overflow-hidden motion-reduce:hidden"
        role="region"
        aria-label="Carrusel de logos de empresas placeholder"
      >
        {/* Fade masks for smooth edge transitions */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent md:w-32 lg:w-40 2xl:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent md:w-32 lg:w-40 2xl:w-48" />

        {/* Marquee content - pauses on hover */}
        <div className="marquee-wrapper hover:[&_.marquee-track]:pause">
          <MarqueeRow />
        </div>
      </div>
    </div>
  );
}

export default LogoMarquee;
