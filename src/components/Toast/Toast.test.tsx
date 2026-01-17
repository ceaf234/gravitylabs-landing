import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toast from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders with message content', () => {
    const onClose = vi.fn();
    render(<Toast message="Gracias por contactarnos" onClose={onClose} />);

    expect(screen.getByText('Gracias por contactarnos')).toBeInTheDocument();
  });

  it('auto-dismisses after 5 seconds by default', () => {
    const onClose = vi.fn();
    render(<Toast message="Auto dismiss test" onClose={onClose} />);

    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('dismisses when close button is clicked', async () => {
    const onClose = vi.fn();
    render(<Toast message="Manual close test" onClose={onClose} />);

    const closeButton = screen.getByRole('button', { name: /cerrar notificacion/i });

    await act(async () => {
      closeButton.click();
      // Advance past the 200ms fade-out animation delay
      vi.advanceTimersByTime(200);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility attributes', () => {
    const onClose = vi.fn();
    render(<Toast message="Accessibility test" onClose={onClose} />);

    const toast = screen.getByRole('status');
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveAttribute('aria-live', 'polite');
  });
});
