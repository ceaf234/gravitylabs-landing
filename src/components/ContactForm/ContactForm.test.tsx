import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders all 7 required fields with Spanish labels', () => {
    render(<ContactForm />);

    // Text inputs - accessible names with accents
    expect(screen.getByRole('textbox', { name: /nombre/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /tel[eé]fono/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /correo/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /empresa/i })).toBeInTheDocument();

    // Custom select dropdowns (combobox role)
    expect(screen.getByRole('combobox', { name: /c[oó]mo podemos ayudarte/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /presupuesto/i })).toBeInTheDocument();

    // Textarea
    expect(screen.getByRole('textbox', { name: /cu[eé]ntanos sobre tu proyecto/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields on submit attempt', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/este campo es obligatorio/i).length).toBeGreaterThan(0);
    });
  });

  it('has submit button that is present in the form', () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('logs form data and shows success toast on valid submission', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const onSuccess = vi.fn();

    render(<ContactForm onSuccess={onSuccess} />);

    // Fill in all required text fields
    await user.type(screen.getByRole('textbox', { name: /nombre/i }), 'Carlos Alvarez');
    await user.type(screen.getByRole('textbox', { name: /tel[eé]fono/i }), '1234 5678');
    await user.type(screen.getByRole('textbox', { name: /correo/i }), 'carlos@example.com');
    await user.type(screen.getByRole('textbox', { name: /empresa/i }), 'Mi Empresa S.A.');

    // Select from custom dropdowns
    const servicioDropdown = screen.getByRole('combobox', { name: /c[oó]mo podemos ayudarte/i });
    await user.click(servicioDropdown);
    await user.click(screen.getByRole('option', { name: /desarrollo de software/i }));

    const presupuestoDropdown = screen.getByRole('combobox', { name: /presupuesto/i });
    await user.click(presupuestoDropdown);
    await user.click(screen.getByRole('option', { name: /\$1,000.*\$5,000/i }));

    await user.type(
      screen.getByRole('textbox', { name: /cu[eé]ntanos sobre tu proyecto/i }),
      'Este es un mensaje de prueba con mas de veinte caracteres para pasar la validacion.'
    );

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
      expect(screen.getByText(/gracias por contactarnos/i)).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it('has honeypot field hidden and rejects filled submissions silently', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<ContactForm />);

    // The honeypot field should be hidden with sr-only
    const honeypotField = document.querySelector('input[name="website"]');
    expect(honeypotField).toBeInTheDocument();
    expect(honeypotField?.parentElement).toHaveClass('sr-only');

    // Fill in all required text fields
    await user.type(screen.getByRole('textbox', { name: /nombre/i }), 'Bot User');
    await user.type(screen.getByRole('textbox', { name: /tel[eé]fono/i }), '1234 5678');
    await user.type(screen.getByRole('textbox', { name: /correo/i }), 'bot@example.com');
    await user.type(screen.getByRole('textbox', { name: /empresa/i }), 'Bot Company');

    // Select from custom dropdowns
    const servicioDropdown = screen.getByRole('combobox', { name: /c[oó]mo podemos ayudarte/i });
    await user.click(servicioDropdown);
    await user.click(screen.getByRole('option', { name: /desarrollo de software/i }));

    const presupuestoDropdown = screen.getByRole('combobox', { name: /presupuesto/i });
    await user.click(presupuestoDropdown);
    await user.click(screen.getByRole('option', { name: /\$1,000.*\$5,000/i }));

    await user.type(
      screen.getByRole('textbox', { name: /cu[eé]ntanos sobre tu proyecto/i }),
      'Este es un mensaje de prueba con mas de veinte caracteres.'
    );

    // Fill the honeypot field (simulating a bot)
    if (honeypotField) {
      await user.type(honeypotField as HTMLInputElement, 'http://spam.com');
    }

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    await user.click(submitButton);

    await waitFor(() => {
      // Should log honeypot triggered message
      expect(consoleSpy).toHaveBeenCalledWith('[Honeypot triggered]');
    });

    consoleSpy.mockRestore();
  });

  it('resets form after successful submission', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();

    render(<ContactForm />);

    // Fill in all required text fields
    const nombreInput = screen.getByRole('textbox', { name: /nombre/i });
    await user.type(nombreInput, 'Carlos Alvarez');
    await user.type(screen.getByRole('textbox', { name: /tel[eé]fono/i }), '1234 5678');
    await user.type(screen.getByRole('textbox', { name: /correo/i }), 'carlos@example.com');
    await user.type(screen.getByRole('textbox', { name: /empresa/i }), 'Mi Empresa S.A.');

    // Select from custom dropdowns
    const servicioDropdown = screen.getByRole('combobox', { name: /c[oó]mo podemos ayudarte/i });
    await user.click(servicioDropdown);
    await user.click(screen.getByRole('option', { name: /desarrollo de software/i }));

    const presupuestoDropdown = screen.getByRole('combobox', { name: /presupuesto/i });
    await user.click(presupuestoDropdown);
    await user.click(screen.getByRole('option', { name: /\$1,000.*\$5,000/i }));

    await user.type(
      screen.getByRole('textbox', { name: /cu[eé]ntanos sobre tu proyecto/i }),
      'Este es un mensaje de prueba con mas de veinte caracteres para pasar la validacion.'
    );

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    await user.click(submitButton);

    await waitFor(() => {
      // Form should be reset - nombre field should be empty
      expect(nombreInput).toHaveValue('');
    });
  });
});
