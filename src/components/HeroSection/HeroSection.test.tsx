import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('occupies most of viewport height with peek for services', () => {
    render(<HeroSection />);
    const heroSection = screen.getByRole('main');
    // Hero uses 85vh on mobile, 75vh on desktop to show services cards peek
    expect(heroSection).toHaveClass('min-h-[85vh]');
  });

  it('renders headline with correct h1 structure', () => {
    render(<HeroSection />);
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveTextContent(/hacemos.*crecer.*negocio.*tecnolog/i);
  });

  it('renders CTA button that is accessible', () => {
    render(<HeroSection />);
    const primaryCTA = screen.getByRole('link', { name: /agenda tu llamada/i });
    expect(primaryCTA).toBeInTheDocument();
  });

  it('has left-aligned content with flexbox', () => {
    render(<HeroSection />);
    const heroSection = screen.getByRole('main');
    expect(heroSection).toHaveClass('flex');
    expect(heroSection).toHaveClass('items-start');
    expect(heroSection).toHaveClass('justify-center');
  });
});
