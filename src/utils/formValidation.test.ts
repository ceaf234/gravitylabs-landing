import { describe, it, expect } from 'vitest';
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateMinLength,
  validateMaxLength,
  validateContactForm,
  type ContactFormData,
} from './formValidation';

describe('Form Validation Utilities', () => {
  it('returns Spanish error message for empty required field', () => {
    const result = validateRequired('', 'Nombre');
    expect(result).toBe('Este campo es obligatorio');

    const resultWithValue = validateRequired('Carlos', 'Nombre');
    expect(resultWithValue).toBeNull();
  });

  it('validates email format correctly', () => {
    // Invalid emails
    expect(validateEmail('')).toBe('Por favor ingresa un correo electronico valido');
    expect(validateEmail('invalid')).toBe('Por favor ingresa un correo electronico valido');
    expect(validateEmail('invalid@')).toBe('Por favor ingresa un correo electronico valido');
    expect(validateEmail('@domain.com')).toBe('Por favor ingresa un correo electronico valido');

    // Valid emails
    expect(validateEmail('test@example.com')).toBeNull();
    expect(validateEmail('user.name@domain.co')).toBeNull();
    expect(validateEmail('user+tag@example.org')).toBeNull();
  });

  it('validates phone numbers with digits, spaces, dashes, and parentheses', () => {
    // Valid phone formats
    expect(validatePhone('12345678')).toBeNull();
    expect(validatePhone('1234 5678')).toBeNull();
    expect(validatePhone('(502) 1234-5678')).toBeNull();
    expect(validatePhone('+502 1234-5678')).toBeNull();
    expect(validatePhone('123-456-7890')).toBeNull();

    // Invalid phone formats
    expect(validatePhone('')).toBe('Por favor ingresa un numero de telefono valido');
    expect(validatePhone('abc123')).toBe('Por favor ingresa un numero de telefono valido');
    expect(validatePhone('phone: 123')).toBe('Por favor ingresa un numero de telefono valido');
  });

  it('validates minLength and maxLength with Spanish messages', () => {
    // minLength validation
    expect(validateMinLength('A', 2, 'Nombre')).toBe(
      'El campo Nombre debe tener al menos 2 caracteres'
    );
    expect(validateMinLength('AB', 2, 'Nombre')).toBeNull();
    expect(validateMinLength('ABC', 2, 'Nombre')).toBeNull();

    // maxLength validation
    expect(validateMaxLength('A'.repeat(101), 100, 'Nombre')).toBe(
      'El campo Nombre no puede exceder 100 caracteres'
    );
    expect(validateMaxLength('A'.repeat(100), 100, 'Nombre')).toBeNull();
    expect(validateMaxLength('A'.repeat(50), 100, 'Nombre')).toBeNull();
  });

  it('validates entire form and returns all errors', () => {
    const emptyForm: ContactFormData = {
      nombre: '',
      telefono: '',
      correo: '',
      empresa: '',
      servicio: '',
      presupuesto: '',
      mensaje: '',
    };

    const result = validateContactForm(emptyForm);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);

    // Check that multiple fields have errors
    const fieldNames = result.errors.map((e) => e.field);
    expect(fieldNames).toContain('nombre');
    expect(fieldNames).toContain('correo');
    expect(fieldNames).toContain('telefono');

    // Valid form
    const validForm: ContactFormData = {
      nombre: 'Carlos Alvarez',
      telefono: '1234 5678',
      correo: 'carlos@example.com',
      empresa: 'Mi Empresa S.A.',
      servicio: 'Desarrollo de Software',
      presupuesto: '$1,000-$5,000',
      mensaje: 'Este es un mensaje de prueba con mas de veinte caracteres.',
    };

    const validResult = validateContactForm(validForm);
    expect(validResult.isValid).toBe(true);
    expect(validResult.errors).toHaveLength(0);
  });
});
