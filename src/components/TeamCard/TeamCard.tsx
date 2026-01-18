import { PersonPlaceholder } from '../PersonPlaceholder';

/**
 * Props for the TeamCard component
 */
export interface TeamCardProps {
  /** Team member's full name */
  name: string;
  /** Team member's role/position */
  role: string;
  /** Additional CSS classes for customization */
  className?: string;
}

/**
 * Base styles for the TeamCard component
 * - Glass/transparent background matching site theme
 * - Subtle border and shadow for depth
 * - Rounded corners and padding that scales on large screens
 */
const baseStyles =
  'bg-white/5 border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] rounded-2xl overflow-hidden 2xl:rounded-3xl h-full flex flex-col';

/**
 * Hover interaction styles
 * - Scale transform on hover for subtle growth effect
 * - Border highlight transitioning to accent color
 * - Smooth transition with ease-out timing
 */
const hoverStyles =
  'scale-100 hover:scale-[1.02] transform-gpu hover:border-accent-gold transition-all duration-300 ease-out';

/**
 * Accessibility styles for reduced motion preference
 */
const motionReduceStyles = 'motion-reduce:transform-none motion-reduce:transition-none';

/**
 * TeamCard displays a team member with a person icon placeholder, name, and role.
 * Used in the Team Section to showcase company members.
 *
 * Features:
 * - Glass/translucent background so dotted wave is visible
 * - Person icon placeholder with consistent aspect ratio
 * - Subtle hover effects respecting prefers-reduced-motion
 *
 * @example
 * ```tsx
 * <TeamCard
 *   name="Carlos Alvarado"
 *   role="Gerente de Producto"
 * />
 * ```
 */
function TeamCard({ name, role, className = '' }: TeamCardProps) {
  return (
    <article className={`${baseStyles} ${hoverStyles} ${motionReduceStyles} ${className}`.trim()}>
      {/* Person Icon Placeholder - 4:3 aspect ratio */}
      <PersonPlaceholder aspectRatio="aspect-[4/3]" />

      {/* Content area - role, name */}
      <div className="flex flex-1 flex-col justify-between p-5 md:p-6 2xl:p-8">
        <div>
          {/* Role - eyebrow style */}
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-text-eyebrow 2xl:text-sm">
            {role}
          </p>

          {/* Name - bold */}
          <h3 className="text-lg font-bold text-text-primary md:text-xl 2xl:text-2xl">{name}</h3>
        </div>
      </div>
    </article>
  );
}

export default TeamCard;
