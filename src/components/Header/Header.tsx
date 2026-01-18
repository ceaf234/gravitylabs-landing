import type { CSSProperties } from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Container } from '../layout';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  const openMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    // Return focus to the menu button when closing
    menuButtonRef.current?.focus();
  };

  // Focus management: Move focus to close button when menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Small delay to ensure the menu is rendered
      const timeoutId = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isMobileMenuOpen]);

  // Close menu on Escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMenu();
      }
    },
    [isMobileMenuOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Trap focus within mobile menu
  const handleMenuKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      const focusableElements = document.querySelectorAll(
        '#mobile-menu a, #mobile-menu button'
      ) as NodeListOf<HTMLElement>;

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

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <header
        role="banner"
        className="dot-wave fixed left-0 right-0 top-0 z-50 bg-background"
        style={
          {
            '--dot-wave-opacity': 0.663,
            '--dot-wave-brightness': 2.535,
          } as CSSProperties
        }
      >
        <Container
          as="nav"
          className="flex items-center justify-between py-4 2xl:py-6 3xl:py-8"
          aria-label="Navegacion principal"
        >
          {/* Logo - Scales with viewport, larger on big screens */}
          <a
            href="/"
            className="text-lg font-bold text-text-primary transition-opacity hover:opacity-80 focus-visible:rounded-sm 2xl:text-xl 4xl:text-2xl"
            aria-label="GravityLabs - Ir a inicio"
          >
            GravityLabs
          </a>

          {/* Desktop Navigation - Hidden visually on mobile */}
          <div className="hidden items-center gap-8 md:flex 2xl:gap-10 3xl:gap-12" aria-label="Menu principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-nav font-medium text-text-muted transition-colors hover:text-text-primary focus-visible:text-text-primary focus-visible:rounded-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="rounded-full bg-accent-gold px-5 py-2 text-nav font-medium text-[#1a1a1a] transition-colors hover:bg-accent-gold-hover focus-visible:ring-2 focus-visible:ring-accent-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background 2xl:px-7 2xl:py-3 3xl:px-8 3xl:py-4"
            >
              Hablemos
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-white/10 md:hidden"
            onClick={openMenu}
            aria-label="Abrir menu de navegacion"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </Container>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegacion movil"
            id="mobile-menu"
            className="fixed inset-0 z-50 md:hidden"
            onKeyDown={handleMenuKeyDown}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <div className="absolute right-0 top-0 h-full w-full max-w-sm animate-slide-in-right bg-background-elevated motion-reduce:animate-none motion-reduce:opacity-100">
              <div className="flex h-full flex-col">
                {/* Menu Header */}
                <div className="flex items-center justify-between px-4 py-4">
                  <span className="text-xl font-bold text-text-primary" aria-hidden="true">
                    GravityLabs
                  </span>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-white/10"
                    onClick={closeMenu}
                    aria-label="Cerrar menu de navegacion"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Menu Links */}
                <nav
                  className="flex flex-1 flex-col gap-2 px-4 pt-4"
                  aria-label="Menu de navegacion movil"
                >
                  {navLinks.map((link, index) => (
                    <a
                      key={link.href}
                      ref={index === 0 ? firstMenuLinkRef : undefined}
                      href={link.href}
                      className="rounded-lg px-4 py-3 text-lg font-medium text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary focus-visible:bg-white/5 focus-visible:text-text-primary"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="#contacto"
                    className="mt-4 rounded-full bg-accent-gold px-5 py-3 text-center text-lg font-medium text-[#1a1a1a] transition-colors hover:bg-accent-gold-hover focus-visible:ring-2 focus-visible:ring-accent-gold/50"
                    onClick={closeMenu}
                  >
                    Hablemos
                  </a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
