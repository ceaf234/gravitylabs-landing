import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export interface ToastProps {
  /** Message content to display in the toast */
  message: string;
  /** Callback when toast is closed (either manually or after auto-dismiss) */
  onClose: () => void;
  /** Duration in milliseconds before auto-dismiss (default: 5000) */
  duration?: number;
}

/**
 * Toast notification component for success feedback.
 * Fixed position bottom-right with slide-in animation.
 * Auto-dismisses after specified duration or can be closed manually.
 *
 * @example
 * ```tsx
 * <Toast
 *   message="Gracias por contactarnos"
 *   onClose={() => setShowToast(false)}
 *   duration={5000}
 * />
 * ```
 */
function Toast({ message, onClose, duration = 5000 }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    // Wait for fade-out animation before calling onClose
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-4 rounded-lg border-l-4 border-accent-gold bg-background-elevated px-4 py-3 shadow-lg transition-opacity duration-200 motion-reduce:animate-none 2xl:bottom-8 2xl:right-8 2xl:px-6 2xl:py-4 3xl:bottom-10 3xl:right-10 4xl:bottom-12 4xl:right-12 ${
        isExiting ? 'opacity-0' : 'animate-slide-in-right'
      }`}
    >
      <p className="text-sm text-text-primary 2xl:text-base 3xl:text-lg">{message}</p>
      <button
        type="button"
        onClick={handleClose}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/10 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
        aria-label="Cerrar notificacion"
      >
        <X className="h-5 w-5 2xl:h-6 2xl:w-6" aria-hidden="true" />
      </button>
    </div>
  );
}

export default Toast;
