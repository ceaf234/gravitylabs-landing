import { Globe, Workflow, ShoppingCart, Brain, Cpu, Database } from 'lucide-react';
import { DottedWaveBackground } from '../backgrounds';
import { ServiceCard } from '../ServiceCard';

/**
 * Service data interface for type safety
 */
interface ServiceData {
  /** Service title displayed as h3 heading in card */
  title: string;
  /** Service description following problem/benefit pattern */
  description: string;
  /** Lucide icon component for the service */
  icon: typeof Globe;
}

/**
 * Array of 6 service offerings with Spanish copy
 * Each follows the problem/benefit description pattern
 */
const services: ServiceData[] = [
  {
    title: 'Sitios web que venden',
    description:
      'Diseñamos tu presencia digital para que transmita profesionalismo y convierta visitantes en clientes.',
    icon: Globe,
  },
  {
    title: 'Automatización de procesos',
    description:
      'Eliminamos el trabajo repetitivo. Lo que hoy haces en horas, tu sistema lo hará en minutos.',
    icon: Workflow,
  },
  {
    title: 'Tiendas en línea',
    description:
      'Vende 24/7 con una tienda rápida, segura y lista para recibir pagos desde el día uno.',
    icon: ShoppingCart,
  },
  {
    title: 'Inteligencia artificial aplicada',
    description:
      'Chatbots, análisis de datos, asistentes internos — ponemos la IA a trabajar en tu operación real.',
    icon: Brain,
  },
  {
    title: 'Internet de las cosas (IoT)',
    description:
      'Conecta sensores y dispositivos para monitorear tu operación en tiempo real — desde inventario hasta maquinaria.',
    icon: Cpu,
  },
  {
    title: 'Sistemas de gestión (CRM/ERP)',
    description:
      'Centraliza clientes, ventas, inventario y finanzas en un solo lugar. Menos Excel, más control.',
    icon: Database,
  },
];

/**
 * ServicesSection displays the company's 6 core service offerings
 * in a responsive card-based layout.
 *
 * Features:
 * - Semantic HTML with section element and proper heading hierarchy
 * - Accessible via aria-labelledby and navigable via #servicios anchor
 * - Responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop
 * - Spanish copy targeting Guatemalan SMBs
 *
 * @example
 * ```tsx
 * <ServicesSection />
 * ```
 */
function ServicesSection() {
  return (
    <DottedWaveBackground
      as="section"
      id="servicios"
      aria-labelledby="services-heading"
      className="bg-background px-4 py-section md:px-6 lg:px-8 2xl:px-12 3xl:px-16 4xl:px-20"
      brightnessBoost={1.3}
    >
      {/* Container with progressive max-width for large screens */}
      <div className="mx-auto max-w-6xl 2xl:max-w-[90rem] 3xl:max-w-[108rem] 4xl:max-w-[120rem]">
        {/* Section Header - Using div to avoid implicit banner role conflict */}
        <div className="mb-12 md:mb-16 2xl:mb-20 3xl:mb-24 4xl:mb-28">
          {/* Eyebrow Text */}
          <p className="mb-4 text-eyebrow font-medium uppercase tracking-[0.2em] text-text-eyebrow 2xl:mb-6 3xl:mb-8">
            En GravityLabs
          </p>

          {/* Section Headline - Progressive max-width for readability */}
          <h2
            id="services-heading"
            className="max-w-3xl text-display-md font-bold leading-[1.1] text-text-primary 2xl:max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl"
          >
            Somos la agencia de software que crea soluciones a tu medida que trabajan por ti —
            mientras tú te enfocas en crecer.
          </h2>
        </div>

        {/* Responsive Grid for Service Cards - 4 columns on 2xl+ screens */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-8 3xl:gap-10 4xl:gap-12">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </DottedWaveBackground>
  );
}

export default ServicesSection;
