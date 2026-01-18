import { DottedWaveBackground } from '../backgrounds';
import LogoMarquee from '../LogoMarquee/LogoMarquee';

/**
 * ProjectsSection displays a logo carousel of placeholder client logos.
 *
 * Features:
 * - Dotted wave background consistent with other sections
 * - Infinite scrolling logo marquee
 * - Glass/transparent panel for the carousel
 * - Responsive layout matching site-wide container system
 * - Anchor target for #proyectos navigation
 * - Respects prefers-reduced-motion (static grid fallback)
 *
 * @example
 * ```tsx
 * <ProjectsSection />
 * ```
 */
function ProjectsSection() {
  return (
    <DottedWaveBackground
      as="section"
      id="proyectos"
      aria-labelledby="projects-heading"
      className="bg-background px-4 py-section md:px-6 lg:px-8 2xl:px-12 3xl:px-16 4xl:px-20"
      brightnessBoost={1.3}
    >
      {/* Container with progressive max-width for large screens */}
      <div className="mx-auto max-w-6xl 2xl:max-w-[90rem] 3xl:max-w-[108rem] 4xl:max-w-[120rem]">
        {/* Section Header */}
        <div className="mb-12 text-left md:mb-16 2xl:mb-20">
          {/* Eyebrow Text */}
          <p className="mb-4 text-eyebrow font-medium uppercase tracking-[0.2em] text-text-eyebrow 2xl:mb-6">
            Proyectos
          </p>

          {/* Section Headline */}
          <h2
            id="projects-heading"
            className="max-w-3xl text-display-md font-bold leading-[1.1] text-text-primary 2xl:max-w-4xl"
          >
            Empresas que han confiado en nosotros
          </h2>
        </div>

        {/* Logo Carousel Container - Glass panel (30% taller) */}
        <div className="rounded-2xl border border-white/10 bg-white/5 py-14 px-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] md:py-16 md:px-8 lg:py-[72px] lg:px-10 2xl:py-20 2xl:px-12 2xl:rounded-3xl">
          <LogoMarquee />
        </div>
      </div>
    </DottedWaveBackground>
  );
}

export default ProjectsSection;
