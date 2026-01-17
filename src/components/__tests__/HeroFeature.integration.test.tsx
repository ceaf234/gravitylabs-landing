/**
 * Hero Feature Integration Tests
 *
 * These tests verify critical user workflows and integration points
 * for the complete Hero Section feature (header + hero section).
 *
 * This file fills identified gaps from the test review (Task 8.2).
 * Maximum of 8 additional tests per Task 8.3 requirements.
 */

import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('Hero Feature Integration', () => {
  /**
   * Test 1: Complete hero page renders with all major sections
   * Gap identified: No integration test verifying header + hero work together
   */
  it('renders complete hero page with header and hero section', () => {
    render(<App />);

    // Header section with navigation
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Hero section as main content
    const heroSection = screen.getByRole('main');
    expect(heroSection).toBeInTheDocument();

    // Logo in header
    expect(screen.getByRole('link', { name: /gravitylabs/i })).toBeInTheDocument();

    // Navigation container in header (Container component renders as nav with aria-label)
    const mainNav = within(header).getByLabelText(/navegacion principal/i);
    expect(mainNav).toBeInTheDocument();

    // Main headline in hero with typewriter text
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toHaveTextContent(/hacemos.*crecer.*negocio.*tecnolog/i);

    // CTA button in hero
    expect(screen.getByRole('link', { name: /agenda tu llamada/i })).toBeInTheDocument();
  });

  /**
   * Test 2: Escape key closes mobile menu
   * Gap identified: Keyboard handler exists but Escape key behavior not tested
   */
  it('closes mobile menu when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    await user.click(menuButton);

    // Verify menu is open
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Press Escape to close
    await user.keyboard('{Escape}');

    // Menu should be closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  /**
   * Test 3: Skip-to-content link targets main content area
   * Gap identified: Skip link exists but target verification not tested
   */
  it('skip-to-content link points to main content section', () => {
    render(<App />);

    // Find the skip link
    const skipLink = screen.getByRole('link', { name: /saltar al contenido/i });
    expect(skipLink).toHaveAttribute('href', '#main-content');

    // Verify the target element exists with correct id
    const mainContent = document.getElementById('main-content');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveAttribute('role', 'main');
  });

  /**
   * Test 4: Hero headline uses display font for impact
   * Gap identified: Core visual requirement for large bold headline
   */
  it('hero headline uses display font and hero sizing', () => {
    render(<App />);

    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toBeInTheDocument();
    // Verify display font is applied
    expect(headline).toHaveClass('font-display');
    // Verify extrabold font weight for impact
    expect(headline).toHaveClass('font-extrabold');
    // Verify tight leading for impact
    expect(headline).toHaveClass('leading-[0.95]');
    // Verify inline clamp() style for massive responsive scaling
    expect(headline).toHaveStyle({ fontSize: 'clamp(2.2rem, 5.5vw, 10.5rem)' });
  });

  /**
   * Test 5: Subheadline displays value proposition
   * Gap identified: Value proposition copy is critical for conversion
   */
  it('displays subheadline with value proposition text', () => {
    render(<App />);

    const heroSection = screen.getByRole('main');
    const subheadline = within(heroSection).getByText(
      /dise[ñn]amos.*desarrollamos.*software.*inteligencia.*artificial.*modernizar/i
    );

    expect(subheadline).toBeInTheDocument();
    // Verify max-width constraint for readability (60ch for optimal line length)
    expect(subheadline).toHaveClass('max-w-[60ch]');
  });

  /**
   * Test 7: Mobile menu closes when navigation link is clicked
   * Gap identified: UX workflow for menu dismissal not tested
   */
  it('closes mobile menu when a navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    await user.click(menuButton);

    // Verify menu is open
    const mobileMenu = screen.getByRole('dialog');
    expect(mobileMenu).toBeInTheDocument();

    // Click on a navigation link in the mobile menu
    const serviciosLink = within(mobileMenu).getByRole('link', { name: /servicios/i });
    await user.click(serviciosLink);

    // Menu should be closed after clicking a link
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  /**
   * Test 8: Scroll indicator links to services section
   * Gap identified: Scroll indicator functionality for navigation not tested
   */
  it('scroll indicator links to services section for navigation', () => {
    render(<App />);

    const scrollIndicator = screen.getByRole('link', {
      name: /desplazarse hacia abajo/i,
    });

    expect(scrollIndicator).toBeInTheDocument();
    // Should link to services section as per implementation
    expect(scrollIndicator).toHaveAttribute('href', '#servicios');
  });
});
