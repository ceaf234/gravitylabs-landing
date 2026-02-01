import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header', () => {
  it('renders logo that links to home', () => {
    render(<Header />);
    const logo = screen.getByRole('link', { name: /gravitylabs/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders all navigation links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /servicios/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /nosotros/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /proyectos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contacto/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /hablemos/i })).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger button is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    expect(menuButton).toBeInTheDocument();

    // Menu should be closed initially
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Open menu
    await user.click(menuButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Close menu
    const closeButton = screen.getByRole('button', { name: /cerrar menu/i });
    await user.click(closeButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('supports keyboard navigation for menu items', async () => {
    const user = userEvent.setup();
    render(<Header />);

    // First tab should focus skip link
    await user.tab();
    expect(screen.getByRole('link', { name: /saltar al contenido/i })).toHaveFocus();

    // Second tab should focus logo
    await user.tab();
    expect(screen.getByRole('link', { name: /gravitylabs/i })).toHaveFocus();

    // Third tab should focus Products dropdown trigger
    await user.tab();
    expect(screen.getByRole('button', { name: /productos/i })).toHaveFocus();

    // Fourth tab should focus first nav link
    await user.tab();
    expect(screen.getByRole('link', { name: /servicios/i })).toHaveFocus();
  });
});
