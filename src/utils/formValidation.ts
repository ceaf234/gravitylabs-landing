/**
 * Form validation utilities with Spanish error messages
 * for the GravityLabs contact form
 */

export interface FormFieldError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormFieldError[];
}

export interface ContactFormData {
  nombre: string;
  telefono: string;
  correo: string;
  empresa: string;
  servicio: string;
  presupuesto: string;
  mensaje: string;
}

/**
 * Validates that a field is not empty
 * @returns Spanish error message or null if valid
 */
export function validateRequired(value: string, _fieldName: string): string | null {
  if (!value || value.trim() === '') {
    return 'Este campo es obligatorio';
  }
  return null;
}

/**
 * Validates email format
 * @returns Spanish error message or null if valid
 */
export function validateEmail(value: string): string | null {
  if (!value || value.trim() === '') {
    return 'Por favor ingresa un correo electronico valido';
  }

  // Standard email regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    return 'Por favor ingresa un correo electronico valido';
  }

  return null;
}

/**
 * Validates phone number format
 * Accepts digits, spaces, dashes, parentheses, and plus sign
 * @returns Spanish error message or null if valid
 */
export function validatePhone(value: string): string | null {
  if (!value || value.trim() === '') {
    return 'Por favor ingresa un numero de telefono valido';
  }

  // Pattern accepts digits, spaces, dashes, parentheses, and plus sign
  const phonePattern = /^[\d\s\-()+ ]+$/;
  if (!phonePattern.test(value)) {
    return 'Por favor ingresa un numero de telefono valido';
  }

  return null;
}

/**
 * Validates minimum length of a field
 * @returns Spanish error message or null if valid
 */
export function validateMinLength(value: string, min: number, fieldName: string): string | null {
  if (value.length < min) {
    return `El campo ${fieldName} debe tener al menos ${min} caracteres`;
  }
  return null;
}

/**
 * Validates maximum length of a field
 * @returns Spanish error message or null if valid
 */
export function validateMaxLength(value: string, max: number, fieldName: string): string | null {
  if (value.length > max) {
    return `El campo ${fieldName} no puede exceder ${max} caracteres`;
  }
  return null;
}

/**
 * Validates the entire contact form
 * @returns ValidationResult with isValid flag and array of errors
 */
export function validateContactForm(formData: ContactFormData): ValidationResult {
  const errors: FormFieldError[] = [];

  // Validate nombre
  const nombreRequired = validateRequired(formData.nombre, 'Nombre');
  if (nombreRequired) {
    errors.push({ field: 'nombre', message: nombreRequired });
  } else {
    const nombreMinLength = validateMinLength(formData.nombre, 2, 'Nombre');
    if (nombreMinLength) {
      errors.push({ field: 'nombre', message: nombreMinLength });
    }
    const nombreMaxLength = validateMaxLength(formData.nombre, 100, 'Nombre');
    if (nombreMaxLength) {
      errors.push({ field: 'nombre', message: nombreMaxLength });
    }
  }

  // Validate telefono
  const telefonoError = validatePhone(formData.telefono);
  if (telefonoError) {
    errors.push({ field: 'telefono', message: telefonoError });
  }

  // Validate correo
  const correoError = validateEmail(formData.correo);
  if (correoError) {
    errors.push({ field: 'correo', message: correoError });
  }

  // Validate empresa
  const empresaRequired = validateRequired(formData.empresa, 'Nombre de Empresa');
  if (empresaRequired) {
    errors.push({ field: 'empresa', message: empresaRequired });
  } else {
    const empresaMinLength = validateMinLength(formData.empresa, 2, 'Nombre de Empresa');
    if (empresaMinLength) {
      errors.push({ field: 'empresa', message: empresaMinLength });
    }
    const empresaMaxLength = validateMaxLength(formData.empresa, 150, 'Nombre de Empresa');
    if (empresaMaxLength) {
      errors.push({ field: 'empresa', message: empresaMaxLength });
    }
  }

  // Validate servicio
  const servicioRequired = validateRequired(formData.servicio, 'Servicio');
  if (servicioRequired) {
    errors.push({ field: 'servicio', message: servicioRequired });
  }

  // Validate presupuesto
  const presupuestoRequired = validateRequired(formData.presupuesto, 'Presupuesto');
  if (presupuestoRequired) {
    errors.push({ field: 'presupuesto', message: presupuestoRequired });
  }

  // Validate mensaje
  const mensajeRequired = validateRequired(formData.mensaje, 'Mensaje');
  if (mensajeRequired) {
    errors.push({ field: 'mensaje', message: mensajeRequired });
  } else {
    const mensajeMinLength = validateMinLength(formData.mensaje, 20, 'Mensaje');
    if (mensajeMinLength) {
      errors.push({ field: 'mensaje', message: mensajeMinLength });
    }
    const mensajeMaxLength = validateMaxLength(formData.mensaje, 1000, 'Mensaje');
    if (mensajeMaxLength) {
      errors.push({ field: 'mensaje', message: mensajeMaxLength });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
