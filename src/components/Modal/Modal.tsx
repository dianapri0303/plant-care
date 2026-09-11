'use client';

import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

type Variant = 'form' | 'plain' | 'small';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
  variant?: Variant;
  label?: string;
}

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
      fill="currentColor"
    />
  </svg>
);

export default function Modal({
  onClose,
  children,
  title,
  footer,
  variant = 'form',
  label,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const modalClass = `${css.modal} ${
    variant === 'plain' ? css.plain : variant === 'small' ? css.small : ''
  }`;

  const bodyClass =
    variant === 'plain'
      ? css.bodyPlain
      : variant === 'small'
        ? css.bodySmall
        : css.body;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={label ?? title}
    >
      <div className={modalClass}>
        {variant === 'form' && title && (
          <div className={css.header}>
            <h2 className={css.title}>{title}</h2>
            <button
              type="button"
              className={css.close}
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {variant === 'plain' && (
          <div className={css.closeTop}>
            <button
              type="button"
              className={css.close}
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        <div className={bodyClass}>{children}</div>

        {footer && <div className={css.footer}>{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
