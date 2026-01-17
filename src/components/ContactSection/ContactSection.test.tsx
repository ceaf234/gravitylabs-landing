import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactSection from './ContactSection';

describe('ContactSection', () => {
  it('renders with id="contacto" and aria-labelledby', () => {
    render(<ContactSection />);

    const section = document.getElementById('contacto');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'contact-heading');
  });

  it('contains h2 heading with appropriate text', () => {
    render(<ContactSection />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/hablemos sobre tu proyecto/i);
    expect(heading).toHaveAttribute('id', 'contact-heading');
  });

  it('renders ContactForm within the section', () => {
    render(<ContactSection />);

    // ContactForm should be present - check for its form element
    const form = screen.getByRole('form', { name: /formulario de contacto/i });
    expect(form).toBeInTheDocument();
  });

  it('has centered layout with max-width constraint', () => {
    render(<ContactSection />);

    // Check for max-w-3xl centered container
    const centeredContainer = document.querySelector('.max-w-3xl');
    expect(centeredContainer).toBeInTheDocument();
    expect(centeredContainer).toHaveClass('mx-auto');
  });
});
