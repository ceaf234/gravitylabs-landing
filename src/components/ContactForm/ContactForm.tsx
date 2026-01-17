import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { Toast } from '../Toast';
import { validateContactForm, type ContactFormData } from '../../utils/formValidation';
import { Button } from '../Button';
import { CustomSelect, type CustomSelectOption } from '../CustomSelect';

export interface ContactFormProps {
  /** Callback function called after successful form submission */
  onSuccess?: () => void;
  /** Additional CSS classes to apply to the form */
  className?: string;
  /** Whether to show the card wrapper (default: true) */
  showCard?: boolean;
}

/** Service options for the dropdown */
const serviceOptions: CustomSelectOption[] = [
  { value: 'Automatizacion de Procesos', label: 'Automatización de Procesos' },
  { value: 'Integraciones con IA', label: 'Integraciones con IA' },
  { value: 'Desarrollo de Software', label: 'Desarrollo de Software' },
  { value: 'Aun por definir', label: 'Aún por definir' },
];

/** Budget options for the dropdown */
const budgetOptions: CustomSelectOption[] = [
  { value: '$1,000-$5,000', label: '$1,000 - $5,000' },
  { value: '$5,000-$10,000', label: '$5,000 - $10,000' },
  { value: '$10,000+', label: '$10,000+' },
  { value: 'Por definir', label: 'Por definir' },
];

/** Initial empty form state */
const initialFormData: ContactFormData = {
  nombre: '',
  telefono: '',
  correo: '',
  empresa: '',
  servicio: '',
  presupuesto: '',
  mensaje: '',
};

/** Shared input field styles - compact version */
const inputBaseStyles =
  'h-11 w-full rounded-lg border border-border bg-background-elevated px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold';

const inputErrorStyles = 'border-red-500 focus:border-red-500';

const labelStyles = 'mb-1.5 block text-sm font-medium text-text-primary';

const errorTextStyles = 'mt-1 text-xs text-red-400';

/**
 * ContactForm is a reusable contact form component with 7 required fields,
 * honeypot spam prevention, and Spanish labels and error messages.
 *
 * Features:
 * - 2-column grid layout on desktop, single column on mobile
 * - Custom styled dropdowns matching the site's design
 * - All fields have Spanish labels and validation messages
 * - Honeypot field prevents bot submissions
 * - Toast notification on successful submission
 * - Accessible with proper ARIA attributes
 *
 * @example
 * ```tsx
 * <ContactForm onSuccess={() => console.log('Form submitted!')} />
 * ```
 */
function ContactForm({ onSuccess, className = '', showCard = true }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleHoneypotChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHoneypot(e.target.value);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setHoneypot('');
    setErrors({});
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check honeypot first - silently "succeed" for bots
    if (honeypot) {
      console.log('[Honeypot triggered]');
      setShowToast(true);
      resetForm();
      return;
    }

    // Validate form
    const validationResult = validateContactForm(formData);

    if (!validationResult.isValid) {
      // Convert errors array to object for easier field lookup
      const errorMap: Record<string, string> = {};
      validationResult.errors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    // Form is valid - simulate submission
    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setShowToast(true);
      resetForm();
      onSuccess?.();
    }, 500);
  };

  const getInputClasses = (fieldName: string) => {
    return `${inputBaseStyles} ${errors[fieldName] ? inputErrorStyles : ''}`;
  };

  const cardClasses = showCard
    ? 'rounded-xl border border-white/10 bg-background-elevated/50 p-6 shadow-lg backdrop-blur-sm md:p-8'
    : '';

  return (
    <>
      {/* Form Card Container (conditional) */}
      <div className={`${cardClasses} ${className}`.trim()}>
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Formulario de contacto"
        >
          {/* Honeypot field - hidden from users, visible to bots */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={honeypot}
              onChange={handleHoneypotChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Form Grid - 2 columns on desktop */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {/* Row 1: Nombre, Correo */}
            <div>
              <label htmlFor="nombre" className={labelStyles}>
                Nombre <span aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className={getInputClasses('nombre')}
                placeholder="Tu nombre completo"
                aria-required="true"
                aria-invalid={!!errors.nombre}
                aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                minLength={2}
                maxLength={100}
              />
              {errors.nombre && (
                <p id="nombre-error" className={errorTextStyles} role="alert">
                  {errors.nombre}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="correo" className={labelStyles}>
                Correo electrónico <span aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
                className={getInputClasses('correo')}
                placeholder="tu@correo.com"
                aria-required="true"
                aria-invalid={!!errors.correo}
                aria-describedby={errors.correo ? 'correo-error' : undefined}
              />
              {errors.correo && (
                <p id="correo-error" className={errorTextStyles} role="alert">
                  {errors.correo}
                </p>
              )}
            </div>

            {/* Row 2: Telefono, Empresa */}
            <div>
              <label htmlFor="telefono" className={labelStyles}>
                Teléfono <span aria-hidden="true">*</span>
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className={getInputClasses('telefono')}
                placeholder="(502) 1234-5678"
                aria-required="true"
                aria-invalid={!!errors.telefono}
                aria-describedby={errors.telefono ? 'telefono-error' : undefined}
              />
              {errors.telefono && (
                <p id="telefono-error" className={errorTextStyles} role="alert">
                  {errors.telefono}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="empresa" className={labelStyles}>
                Empresa <span aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                className={getInputClasses('empresa')}
                placeholder="Nombre de tu empresa"
                aria-required="true"
                aria-invalid={!!errors.empresa}
                aria-describedby={errors.empresa ? 'empresa-error' : undefined}
                minLength={2}
                maxLength={150}
              />
              {errors.empresa && (
                <p id="empresa-error" className={errorTextStyles} role="alert">
                  {errors.empresa}
                </p>
              )}
            </div>

            {/* Row 3: Servicio, Presupuesto (Custom Dropdowns) */}
            <div>
              <label htmlFor="servicio" className={labelStyles}>
                ¿Cómo podemos ayudarte? <span aria-hidden="true">*</span>
              </label>
              <CustomSelect
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={(value) => handleSelectChange('servicio', value)}
                options={serviceOptions}
                placeholder="Selecciona un servicio"
                required
                hasError={!!errors.servicio}
                errorId={errors.servicio ? 'servicio-error' : undefined}
              />
              {errors.servicio && (
                <p id="servicio-error" className={errorTextStyles} role="alert">
                  {errors.servicio}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="presupuesto" className={labelStyles}>
                Presupuesto <span aria-hidden="true">*</span>
              </label>
              <CustomSelect
                id="presupuesto"
                name="presupuesto"
                value={formData.presupuesto}
                onChange={(value) => handleSelectChange('presupuesto', value)}
                options={budgetOptions}
                placeholder="Selecciona un rango"
                required
                hasError={!!errors.presupuesto}
                errorId={errors.presupuesto ? 'presupuesto-error' : undefined}
              />
              {errors.presupuesto && (
                <p id="presupuesto-error" className={errorTextStyles} role="alert">
                  {errors.presupuesto}
                </p>
              )}
            </div>

            {/* Row 4: Mensaje (Full Width) */}
            <div className="md:col-span-2">
              <label htmlFor="mensaje" className={labelStyles}>
                Cuéntanos sobre tu proyecto <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleInputChange}
                className={`${getInputClasses('mensaje')} h-auto min-h-[100px] resize-y`}
                placeholder="Describe brevemente tu proyecto o necesidad..."
                aria-required="true"
                aria-invalid={!!errors.mensaje}
                aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}
                minLength={20}
                maxLength={1000}
                rows={4}
              />
              {errors.mensaje && (
                <p id="mensaje-error" className={errorTextStyles} role="alert">
                  {errors.mensaje}
                </p>
              )}
            </div>

            {/* Row 5: Submit Button (Full Width) */}
            <div className="md:col-span-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
                ariaLabel={isSubmitting ? 'Enviando formulario...' : 'Enviar formulario de contacto'}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  'Enviar mensaje'
                )}
              </Button>
            </div>
          </div>

          {/* Accessible live region for error announcements */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {Object.keys(errors).length > 0 && (
              <p>
                Hay {Object.keys(errors).length} error{Object.keys(errors).length > 1 ? 'es' : ''} en
                el formulario
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Success Toast */}
      {showToast && (
        <Toast
          message="¡Gracias por contactarnos! Te responderemos pronto."
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}

export default ContactForm;
