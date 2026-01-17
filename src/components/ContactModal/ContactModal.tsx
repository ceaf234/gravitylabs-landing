import { useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import { ContactForm } from '../ContactForm';

export interface ContactModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
}

/**
 * ContactModal displays a slide-in modal with the contact form.
 * Features:
 * - Slide-in animation from right
 * - Focus trap within modal
 * - Closes on Escape key or backdrop click
 * - Prevents body scroll when open
 * - Respects prefers-reduced-motion
 *
 * @example
 * ```tsx
 * <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
 * ```
 */
function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle Escape key to close modal
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Add/remove keydown listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus close button when modal opens
  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  // Focus trap within modal
  const handleModalKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      const focusableElements = document.querySelectorAll(
        '#contact-modal a, #contact-modal button:not([disabled]), #contact-modal input:not([tabindex="-1"]), #contact-modal select, #contact-modal textarea'
      ) as NodeListOf<HTMLElement>;

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  // Handle form success
  const handleFormSuccess = () => {
    // Close modal after a brief delay to show the toast
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      id="contact-modal"
      className="fixed inset-0 z-50"
      onKeyDown={handleModalKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-lg animate-slide-in-right overflow-y-auto bg-background-elevated motion-reduce:animate-none motion-reduce:opacity-100 sm:max-w-xl md:max-w-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-background-elevated px-6 py-4 2xl:px-8 2xl:py-6 3xl:px-10 3xl:py-8">
          <h2
            id="modal-title"
            className="text-xl font-bold text-text-primary 2xl:text-2xl 3xl:text-3xl"
          >
            Agenda tu llamada
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/10 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
            aria-label="Cerrar modal"
          >
            <X className="h-6 w-6 2xl:h-7 2xl:w-7" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 pb-8 pt-4">
          <ContactForm onSuccess={handleFormSuccess} showCard={false} />
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
