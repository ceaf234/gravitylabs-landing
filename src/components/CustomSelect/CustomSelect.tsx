import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface CustomSelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  /** Unique identifier for the select */
  id: string;
  /** Field name for form handling */
  name: string;
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Array of options to display */
  options: CustomSelectOption[];
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field has an error */
  hasError?: boolean;
  /** ID of the error message element for aria-describedby */
  errorId?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * CustomSelect is a styled dropdown component that matches the site's design.
 * Replaces native browser selects with a custom UI.
 *
 * Features:
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Click outside to close
 * - Visual hover and focus states
 * - Accessible with proper ARIA attributes
 */
function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = 'Selecciona una opción',
  required = false,
  hasError = false,
  errorId,
  className = '',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Reset highlighted index when menu opens
  useEffect(() => {
    if (isOpen) {
      const currentIndex = options.findIndex((opt) => opt.value === value);
      setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
    }
  }, [isOpen, options, value]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = useCallback(
    (optionValue: string) => {
      onChange(optionValue);
      setIsOpen(false);
      buttonRef.current?.focus();
    },
    [onChange]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          handleSelect(options[highlightedIndex].value);
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  const baseStyles =
    'flex h-11 w-full items-center justify-between rounded-lg border bg-background-elevated px-3 py-2 text-sm transition-colors cursor-pointer';
  const stateStyles = hasError
    ? 'border-red-500 focus:border-red-500'
    : 'border-border hover:border-border-hover focus:border-accent-gold';
  const focusStyles =
    'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold';

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} />

      {/* Custom select button */}
      <button
        ref={buttonRef}
        type="button"
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={errorId}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`${baseStyles} ${stateStyles} ${focusStyles}`}
      >
        <span className={selectedOption ? 'text-text-primary' : 'text-text-muted'}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul
          ref={listRef}
          id={`${id}-listbox`}
          role="listbox"
          aria-labelledby={id}
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-border bg-background-elevated py-1 shadow-lg"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors ${
                  isHighlighted ? 'bg-white/10' : ''
                } ${isSelected ? 'text-accent-gold' : 'text-text-primary'}`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="h-4 w-4" aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;
