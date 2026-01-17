import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import App from '../../App';

describe('Responsive Layout', () => {
  // Store original window dimensions
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  afterEach(() => {
    // Restore original dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
    vi.restoreAllMocks();
  });

  it('renders mobile layout correctly at 375px width', () => {
    // Set mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<App />);

    // Hero section should be present with dot-wave background
    const heroSection = screen.getByRole('main');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveClass('dot-wave');

    // Container inside hero should have responsive padding
    const container = heroSection.querySelector('.px-6');
    expect(container).toBeInTheDocument();

    // Headline should be present and readable
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toBeInTheDocument();

    // CTA button should have mobile stacking classes
    const primaryCTA = screen.getByRole('link', { name: /agenda tu llamada/i });
    expect(primaryCTA).toBeInTheDocument();

    // Button should have full width on mobile
    expect(primaryCTA).toHaveClass('w-full');

    // Mobile menu button should be present
    const mobileMenuButton = screen.getByRole('button', { name: /abrir menu/i });
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('renders desktop layout correctly at 1280px width', () => {
    // Set desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1280,
    });

    render(<App />);

    // Hero section should be present with dot-wave background
    const heroSection = screen.getByRole('main');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveClass('dot-wave');

    // Container inside hero should have shared layout classes for alignment
    const container = heroSection.querySelector('.max-w-7xl');
    expect(container).toBeInTheDocument();

    // Hero content should be full-width for massive headline scaling (no max-width constraint)
    const contentContainer = heroSection.querySelector('.w-full');
    expect(contentContainer).toBeInTheDocument();

    // Desktop navigation should have nav links - verify header banner exists
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Container is now the nav element with aria-label
    const mainNav = within(header).getByLabelText(/navegacion principal/i);
    expect(mainNav).toBeInTheDocument();

    // Verify desktop nav container has appropriate responsive classes
    const desktopNavContainer = header.querySelector('.md\\:flex');
    expect(desktopNavContainer).toBeInTheDocument();

    // CTA buttons should have responsive width classes
    const primaryCTA = screen.getByRole('link', { name: /agenda tu llamada/i });
    expect(primaryCTA).toHaveClass('sm:w-auto');
  });

  it('typography scales appropriately with clamp values', () => {
    render(<App />);

    // Headline should use display font with inline clamp() style for massive scaling
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toHaveClass('font-display');
    expect(headline).toHaveClass('font-extrabold');
    // Verify inline style is applied for clamp-based font sizing
    expect(headline).toHaveStyle({ fontSize: 'clamp(2.2rem, 5.5vw, 10.5rem)' });

    // Find the hero section to scope our queries
    const heroSection = screen.getByRole('main');

    // Body text should use responsive typography classes
    const bodyText = within(heroSection).getByText(/modernizar y automatizar/i);
    expect(bodyText).toHaveClass('text-sm');
    expect(bodyText).toHaveClass('sm:text-base');
  });

  it('has no horizontal overflow at various viewport widths', () => {
    // Test at narrow mobile width (320px)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320,
    });

    render(<App />);

    // Hero section should have overflow hidden to prevent horizontal scroll
    const heroSection = screen.getByRole('main');
    expect(heroSection).toHaveClass('overflow-hidden');
  });
});
