import type { CSSProperties } from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Container } from '../layout';
import GravityLabsLogo from './GravityLabsLogo_SVG.svg';

interface NavLink {
  label: string;
  href: string;
}

interface ProductLink {
  label: string;
  href: string;
  description: string;
}

const navLinks: NavLink[] = [
  { label: 'Qué hacemos', href: '#servicios' },
  { label: 'Quiénes somos', href: '#nosotros' },
  { label: 'Nuestro trabajo', href: '#proyectos' },
];

const productLinks: ProductLink[] = [
  {
    label: 'Gravity Chat',
    href: 'https://chat.gravitylabs.tech',
    description: 'Mensajería inteligente',
  },
  {
    label: 'Gravity CRM',
    href: 'https://crm.gravitylabs.tech',
    description: 'Gestión de clientes',
  },
  {
    label: 'Gravity ERP',
    href: 'https://erp.gravitylabs.tech',
    description: 'Planificación empresarial',
  },
  {
    label: 'Gravity Appointments',
    href: 'https://appointments.gravitylabs.tech',
    description: 'Agenda de citas',
  },
];

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);

  const openMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
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

  // Close menu or dropdown on Escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isProductsOpen) {
          setIsProductsOpen(false);
          dropdownTriggerRef.current?.focus();
        }
        if (isMobileMenuOpen) {
          closeMenu();
        }
      }
    },
    [isMobileMenuOpen, isProductsOpen]
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

  // Scroll-based shrink behavior using simple threshold
  // Compact mode activates when user scrolls past 60px (stable, predictable)
  useEffect(() => {
    const SCROLL_THRESHOLD = 60;
    let ticking = false;

    const updateCompactState = () => {
      setIsCompact(window.scrollY > SCROLL_THRESHOLD);
      ticking = false;
    };

    const handleScroll = () => {
      // Use requestAnimationFrame to avoid layout thrashing
      if (!ticking) {
        requestAnimationFrame(updateCompactState);
        ticking = true;
      }
    };

    // Set initial state based on current scroll position
    setIsCompact(window.scrollY > SCROLL_THRESHOLD);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
    };

    if (isProductsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProductsOpen]);

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
      <a href="#hero" className="skip-link">
        Saltar al contenido principal
      </a>

      <header
        role="banner"
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-out ${
          isCompact
            ? 'bg-black/55 backdrop-blur-md border-b border-white/10'
            : 'dot-wave bg-background'
        }`}
        style={
          !isCompact
            ? ({
                '--dot-wave-opacity': 0.663,
                '--dot-wave-brightness': 2.535,
              } as CSSProperties)
            : undefined
        }
      >
        <Container
          as="nav"
          className={`flex items-center justify-between transition-all duration-300 ease-out ${
            isCompact ? 'py-2 2xl:py-3 3xl:py-4' : 'py-4 2xl:py-6 3xl:py-8'
          }`}
          aria-label="Navegacion principal"
        >
          {/* Logo - Scales with viewport, larger on big screens */}
          <a
            href="/"
            className="transition-all duration-300 ease-out hover:opacity-80 focus-visible:rounded-sm"
            aria-label="GravityLabs - Ir a inicio"
          >
            <img
              src={GravityLabsLogo}
              alt="GravityLabs"
              className={`transition-all duration-300 ease-out ${
                isCompact ? 'h-6 2xl:h-7 4xl:h-8' : 'h-8 2xl:h-10 4xl:h-11'
              }`}
            />
          </a>

          {/* Desktop Navigation - Hidden visually on mobile */}
          <div
            className={`hidden items-center md:flex transition-all duration-300 ease-out ${
              isCompact ? 'gap-6 2xl:gap-8 3xl:gap-10' : 'gap-8 2xl:gap-10 3xl:gap-12'
            }`}
            aria-label="Menu principal"
          >
            {/* Products dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                ref={dropdownTriggerRef}
                type="button"
                onClick={() => setIsProductsOpen((prev) => !prev)}
                onMouseEnter={() => setIsProductsOpen(true)}
                aria-expanded={isProductsOpen}
                aria-haspopup="menu"
                aria-controls="products-dropdown"
                className={`inline-flex items-center gap-1 font-medium text-text-muted transition-all duration-300 ease-out hover:text-text-primary focus-visible:text-text-primary focus-visible:rounded-sm ${
                  isCompact ? 'text-xs 2xl:text-sm' : 'text-nav'
                }`}
              >
                Productos
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ease-out ${
                    isProductsOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isProductsOpen && (
                <div
                  id="products-dropdown"
                  role="menu"
                  aria-label="Productos de GravityLabs"
                  className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 rounded-xl border border-white/10 bg-white/5 p-2 shadow-lg shadow-black/20 backdrop-blur-xl"
                >
                  {productLinks.map((product) => (
                    <a
                      key={product.href}
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors duration-300 ease-out hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      <span className="text-sm font-medium text-text-primary">{product.label}</span>
                      <span className="text-xs text-text-muted">{product.description}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium text-text-muted transition-all duration-300 ease-out hover:text-text-primary focus-visible:text-text-primary focus-visible:rounded-sm ${
                  isCompact ? 'text-xs 2xl:text-sm' : 'text-nav'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className={`rounded-full bg-accent-gold font-medium text-[#1a1a1a] transition-all duration-300 ease-out hover:bg-accent-gold-hover focus-visible:ring-2 focus-visible:ring-accent-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isCompact
                  ? 'px-4 py-1.5 text-xs 2xl:px-5 2xl:py-2 2xl:text-sm 3xl:px-6 3xl:py-2.5'
                  : 'px-5 py-2 text-nav 2xl:px-7 2xl:py-3 3xl:px-8 3xl:py-4'
              }`}
            >
              Contacto
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            className={`flex items-center justify-center rounded-lg text-text-primary transition-all duration-300 ease-out hover:bg-white/10 md:hidden ${
              isCompact ? 'h-9 w-9' : 'h-11 w-11'
            }`}
            onClick={openMenu}
            aria-label="Abrir menu de navegacion"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
          >
            <Menu
              className={`transition-all duration-300 ease-out ${
                isCompact ? 'h-5 w-5' : 'h-6 w-6'
              }`}
              aria-hidden="true"
            />
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
                  <img src={GravityLabsLogo} alt="GravityLabs" className="h-6" aria-hidden="true" />
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
                  {/* Products accordion */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsMobileProductsOpen((prev) => !prev)}
                      aria-expanded={isMobileProductsOpen}
                      aria-controls="mobile-products-list"
                      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-lg font-medium text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary focus-visible:bg-white/5 focus-visible:text-text-primary"
                    >
                      Productos
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ease-out ${
                          isMobileProductsOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {isMobileProductsOpen && (
                      <div
                        id="mobile-products-list"
                        role="group"
                        aria-label="Productos"
                        className="flex flex-col gap-1 pb-2 pl-4"
                      >
                        {productLinks.map((product) => (
                          <a
                            key={product.href}
                            href={product.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg px-4 py-2.5 text-base font-medium text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary focus-visible:bg-white/5 focus-visible:text-text-primary"
                            onClick={closeMenu}
                          >
                            {product.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

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
                    Contacto
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
