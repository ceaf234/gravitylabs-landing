/**
 * Services Section Integration Tests
 *
 * These tests verify the integration of ServicesSection with the main App:
 * - ServicesSection renders in App after HeroSection
 * - Scroll indicator href="#servicios" links to services section
 * - Proper heading hierarchy (h1 in hero, h2 in services)
 *
 * Test suite follows minimal test strategy per test-writing.md standards.
 */

import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import App from '../../App';

describe('Services Section Integration', () => {
  /**
   * Test 1: ServicesSection renders in App after HeroSection
   * Verifies the section appears in the document structure and follows hero
   */
  it('renders ServicesSection in App after HeroSection', () => {
    render(<App />);

    // Verify HeroSection is present (main element with h1)
    const heroSection = screen.getByRole('main');
    expect(heroSection).toBeInTheDocument();
    const heroHeadline = within(heroSection).getByRole('heading', { level: 1 });
    expect(heroHeadline).toHaveTextContent(/hacemos.*crecer.*negocio.*tecnolog/i);

    // Verify ServicesSection is present (region with h2)
    const servicesSection = screen.getByRole('region', { name: /productos digitales/i });
    expect(servicesSection).toBeInTheDocument();
    expect(servicesSection).toHaveAttribute('id', 'servicios');

    // Verify services section comes after hero by checking DOM order
    const allElements = document.body.querySelectorAll('main, section#servicios');
    expect(allElements.length).toBe(2);
    expect(allElements[0].tagName.toLowerCase()).toBe('main');
    expect(allElements[1]).toHaveAttribute('id', 'servicios');
  });

  /**
   * Test 2: Scroll indicator href="#servicios" links to services section
   * Verifies navigation connection between hero scroll indicator and services section
   */
  it('scroll indicator href="#servicios" links to services section', () => {
    render(<App />);

    // Find the scroll indicator in hero section
    const scrollIndicator = screen.getByRole('link', {
      name: /desplazarse hacia abajo/i,
    });
    expect(scrollIndicator).toBeInTheDocument();
    expect(scrollIndicator).toHaveAttribute('href', '#servicios');

    // Verify the target section exists with matching id
    const servicesSection = document.getElementById('servicios');
    expect(servicesSection).toBeInTheDocument();
    expect(servicesSection?.tagName.toLowerCase()).toBe('section');
  });

  /**
   * Test 3: Page maintains proper heading hierarchy (h1 in hero, h2 in services)
   * Verifies semantic HTML structure for accessibility and SEO
   */
  it('page maintains proper heading hierarchy (h1 -> h2)', () => {
    render(<App />);

    // Get all headings in document order
    const allHeadings = screen.getAllByRole('heading');

    // Filter to get h1 and h2 headings
    const h1Headings = allHeadings.filter((h) => h.tagName.toLowerCase() === 'h1');
    const h2Headings = allHeadings.filter((h) => h.tagName.toLowerCase() === 'h2');

    // Should have exactly one h1 (hero) and at least one h2 (services)
    expect(h1Headings).toHaveLength(1);
    expect(h2Headings.length).toBeGreaterThanOrEqual(1);

    // h1 should contain hero headline text
    expect(h1Headings[0]).toHaveTextContent(/hacemos.*crecer.*negocio.*tecnolog/i);

    // First h2 should be the services section heading
    const servicesHeading = screen.getByRole('heading', {
      level: 2,
      name: /productos digitales/i,
    });
    expect(servicesHeading).toBeInTheDocument();
    expect(servicesHeading).toHaveAttribute('id', 'services-heading');

    // Verify h1 appears before h2 in DOM order
    const h1Index = allHeadings.indexOf(h1Headings[0]);
    const h2Index = allHeadings.indexOf(servicesHeading);
    expect(h1Index).toBeLessThan(h2Index);
  });
});
