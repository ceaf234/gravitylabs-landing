import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactModal from './ContactModal';

describe('ContactModal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
    document.body.style.overflow = '';
  });

  it('renders when isOpen is true, hidden when false', () => {
    const onClose = vi.fn();

    const { rerender } = render(<ContactModal isOpen={false} onClose={onClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(<ContactModal isOpen={true} onClose={onClose} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has role="dialog" with aria-modal="true" and aria-labelledby', () => {
    const onClose = vi.fn();
    render(<ContactModal isOpen={true} onClose={onClose} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('closes on Escape key', () => {
    const onClose = vi.fn();
    render(<ContactModal isOpen={true} onClose={onClose} />);

    // Simulate Escape key press
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on backdrop click', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ContactModal isOpen={true} onClose={onClose} />);

    // Find the backdrop (the element with aria-hidden that covers the background)
    const backdrop = document.querySelector('[aria-hidden="true"]');
    expect(backdrop).toBeInTheDocument();

    if (backdrop) {
      await user.click(backdrop);
    }

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus within modal when open', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ContactModal isOpen={true} onClose={onClose} />);

    // The modal should contain focusable elements
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // There should be a close button
    const closeButton = screen.getByRole('button', { name: /cerrar/i });
    expect(closeButton).toBeInTheDocument();

    // Tab through elements - they should stay within the modal
    // The focus trap mechanism should be in place
    await user.tab();

    // The active element should be within the modal
    expect(dialog.contains(document.activeElement)).toBe(true);
  });
});
