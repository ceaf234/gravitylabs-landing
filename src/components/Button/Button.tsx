import type { ReactNode, MouseEventHandler } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface ButtonProps {
  /** Button visual variant */
  variant?: 'primary' | 'secondary';
  /** Button content */
  children: ReactNode;
  /** Optional icon component to render (typically on the right) */
  icon?: LucideIcon;
  /** Click handler */
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** Optional href for link buttons */
  href?: string;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label for screen readers (if different from visible text) */
  ariaLabel?: string;
  /** Button type attribute (default: 'button') */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button is disabled */
  disabled?: boolean;
}

/** Base styles shared across all button variants - Meets 44x44px minimum touch target, scales on large screens */
const baseStyles =
  'inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent-gold 2xl:min-h-[52px] 2xl:gap-3 2xl:px-9 2xl:py-4 2xl:text-base 3xl:min-h-[60px] 3xl:px-11 3xl:py-5 4xl:min-h-[68px] 4xl:px-14 4xl:py-6';

/** Variant-specific styles with sufficient color contrast */
const variantStyles = {
  primary:
    'bg-accent-gold text-[#1a1a1a] hover:bg-accent-gold-hover focus-visible:ring-2 focus-visible:ring-accent-gold/50',
  secondary:
    'bg-white text-[#1a1a1a] border border-white/20 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-white/50',
};

/** Disabled styles */
const disabledStyles = 'opacity-50 cursor-not-allowed';

function Button({
  variant = 'primary',
  children,
  icon: Icon,
  onClick,
  href,
  className = '',
  ariaLabel,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${disabled ? disabledStyles : ''} ${className}`.trim();

  const content = (
    <>
      {children}
      {Icon && (
        <Icon
          className="h-5 w-5 2xl:h-6 2xl:w-6 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={combinedStyles} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedStyles}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default Button;
