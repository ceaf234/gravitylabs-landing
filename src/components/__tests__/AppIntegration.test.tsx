import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('App Integration', () => {
  afterEach(() => {
    cleanup();
    document.body.style.overflow = '';
  });

  it('renders ContactSection after ServicesSection', () => {
    render(<App />);

    // Both sections should exist
    const servicesSection = document.getElementById('servicios');
    const contactSection = document.getElementById('contacto');

    expect(servicesSection).toBeInTheDocument();
    expect(contactSection).toBeInTheDocument();

    // ContactSection should come after ServicesSection in the DOM
    if (servicesSection && contactSection) {
      const position = servicesSection.compareDocumentPosition(contactSection);
      // Node.DOCUMENT_POSITION_FOLLOWING = 4
      expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it('manages ContactModal state in App', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Modal should not be visible initially
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Find and click the CTA button that opens the modal
    const ctaButton = screen.getByRole('button', { name: /agenda tu llamada/i });
    await user.click(ctaButton);

    // Modal should now be visible
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Close the modal
    const closeButton = screen.getByRole('button', { name: /cerrar/i });
    await user.click(closeButton);

    // Modal should be hidden again
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('opens ContactModal when CTA button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Find the primary CTA button in the hero
    const ctaButton = screen.getByRole('button', { name: /agenda tu llamada/i });
    expect(ctaButton).toBeInTheDocument();

    // Click the CTA button
    await user.click(ctaButton);

    // Modal should open with the form
    await waitFor(() => {
      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
      expect(screen.getByText(/agenda tu llamada/i, { selector: 'h2' })).toBeInTheDocument();
    });
  });
});
