import { Twitter, Linkedin, Github, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '../layout';

interface FooterLink {
  label: string;
  href: string;
}

const navigationLinks: FooterLink[] = [
  { label: 'Inicio', href: '#' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

const resourceLinks: FooterLink[] = [
  { label: 'Blog', href: '#' },
  { label: 'Documentación', href: '#' },
  { label: 'Soporte', href: '#' },
  { label: 'FAQ', href: '#' },
];

// TikTok icon (not available in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const socialLinks = [
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'TikTok', href: '#', icon: TikTokIcon },
  { label: 'Twitter', href: '#', icon: Twitter },
  { label: 'LinkedIn', href: '#', icon: Linkedin },
  { label: 'GitHub', href: '#', icon: Github },
];

/**
 * Footer component with 4-column grid layout on desktop.
 * Features:
 * - Brand section with logo and description
 * - Navigation links
 * - Resource links
 * - Social media links
 * - Copyright notice with divider
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="w-full bg-background border-t border-white/10"
    >
      <Container className="py-12 lg:py-16">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand + Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="/"
              className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
            >
              Gravity Labs
            </a>
            <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-white/60">
              Desarrollamos productos digitales modernos para equipos ambiciosos.
            </p>

            {/* Contact Info */}
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href="mailto:hola@gravitylabs.tech"
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-white/50" aria-hidden="true" />
                  hola@gravitylabs.tech
                </a>
              </li>
              <li>
                <a
                  href="tel:+50230045254"
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-white/50" aria-hidden="true" />
                  +502 3004-5254
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-white/50" aria-hidden="true" />
                Ciudad de Guatemala
              </li>
            </ul>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">
              Navegación
            </h3>
            <ul className="mt-4 space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">
              Recursos
            </h3>
            <ul className="mt-4 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">
              Síguenos
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:outline-none"
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-xs text-white/40">
            &copy; {currentYear} Gravity Labs. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
