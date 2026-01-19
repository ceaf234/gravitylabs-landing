import { DottedWaveBackground } from '../backgrounds';
import { Container } from '../layout';
import { TeamCard } from '../TeamCard';

/**
 * Team member data interface
 */
interface TeamMember {
  /** Team member's full name */
  name: string;
  /** Team member's role/position (Spanish) */
  role: string;
}

/**
 * Array of 6 team members with Spanish copy
 */
const teamMembers: TeamMember[] = [
  {
    name: 'Carlos Alvarado',
    role: 'Director de Producto',
  },
  {
    name: 'María Fernández',
    role: 'Directora de Ingeniería',
  },
  {
    name: 'Diego Herrera',
    role: 'Líder de Infraestructura',
  },
  {
    name: 'Andrés Morales',
    role: 'Desarrollador Senior',
  },
  {
    name: 'Sofía Castillo',
    role: 'Desarrolladora Senior',
  },
  {
    name: 'Valentina Reyes',
    role: 'Estratega de Marca',
  },
];

/**
 * TeamSection displays the company's team members in a responsive grid.
 *
 * Features:
 * - Dotted wave background consistent with other sections
 * - Section header with eyebrow, title, and optional subtitle
 * - Responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop
 * - Data-driven cards mapped from teamMembers array
 * - Anchor target for #equipo navigation
 * - Spanish copy for Guatemalan SMBs
 *
 * @example
 * ```tsx
 * <TeamSection />
 * ```
 */
function TeamSection() {
  return (
    <DottedWaveBackground
      as="section"
      id="equipo"
      aria-labelledby="team-heading"
      className="bg-background px-4 py-section md:px-6 lg:px-8 2xl:px-12 3xl:px-16 4xl:px-20"
      brightnessBoost={1.3}
    >
      <Container>
        {/* Section Header - Left aligned */}
        <div className="mb-12 md:mb-16 2xl:mb-20 3xl:mb-24">
          {/* Eyebrow Text */}
          <p className="mb-4 text-eyebrow font-medium uppercase tracking-[0.2em] text-text-eyebrow 2xl:mb-6">
            Nuestro Equipo
          </p>

          {/* Section Headline */}
          <h2
            id="team-heading"
            className="mb-4 max-w-3xl text-display-md font-bold leading-[1.1] text-text-primary md:mb-6 2xl:max-w-4xl"
          >
            Quienes van a trabajar en tu proyecto.
          </h2>

          {/* Optional Subtitle */}
          <p className="max-w-2xl text-card-body leading-relaxed text-text-muted">
            Somos quienes responden tus mensajes, construyen tu software y dan la cara por los
            resultados.
          </p>
        </div>

        {/* Team Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-8 3xl:gap-10">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} name={member.name} role={member.role} />
          ))}
        </div>
      </Container>
    </DottedWaveBackground>
  );
}

export default TeamSection;
