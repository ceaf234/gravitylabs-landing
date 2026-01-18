import { User } from 'lucide-react';

export interface PersonPlaceholderProps {
  /** Aspect ratio class (default: aspect-[4/3]) */
  aspectRatio?: string;
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * PersonPlaceholder displays a generic person icon placeholder.
 * Used as a consistent placeholder for team member photos across the site.
 *
 * Features:
 * - Gradient background matching site theme
 * - Centered User icon with neutral styling
 * - Configurable aspect ratio
 * - Responsive icon sizing
 *
 * @example
 * ```tsx
 * <PersonPlaceholder aspectRatio="aspect-[4/3]" />
 * <PersonPlaceholder aspectRatio="aspect-[4/5]" />
 * ```
 */
function PersonPlaceholder({
  aspectRatio = 'aspect-[4/3]',
  className = '',
}: PersonPlaceholderProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br from-white/10 to-white/5 ${aspectRatio} ${className}`.trim()}
    >
      <div className="flex h-full w-full items-center justify-center">
        <User
          className="h-20 w-20 text-white/40 md:h-24 md:w-24 2xl:h-28 2xl:w-28"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default PersonPlaceholder;
