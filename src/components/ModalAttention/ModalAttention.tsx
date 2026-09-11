'use client';

import Link from 'next/link';
import Modal from '@/components/Modal/Modal';
import css from './ModalAttention.module.css';

export default function ModalAttention({ onClose }: { onClose: () => void }) {
  return (
    <Modal
      onClose={onClose}
      variant="plain"
      label="Sign in to start your garden"
    >
      <span className={css.icon}>
        <svg width="36" height="40" viewBox="0 0 36 40" fill="none">
          <path
            d="M11.1 36H24.9L26.9 28H9.1L11.1 36ZM11.1 40C10.1667 40 9.35 39.7167 8.65 39.15C7.95 38.5833 7.48333 37.85 7.25 36.95L5 28H31L28.75 36.95C28.5167 37.85 28.05 38.5833 27.35 39.15C26.65 39.7167 25.8333 40 24.9 40H11.1ZM4 24H32V20H4V24ZM18 12C18 8.66667 19.1667 5.83333 21.5 3.5C23.8333 1.16667 26.6667 0 30 0C30 3 29.05 5.6 27.15 7.8C25.25 10 22.8667 11.3333 20 11.8V16H36V24C36 25.1 35.6083 26.0417 34.825 26.825C34.0417 27.6083 33.1 28 32 28H4C2.9 28 1.95833 27.6083 1.175 26.825C0.391667 26.0417 0 25.1 0 24V16H16V11.8C13.1333 11.3333 10.75 10 8.85 7.8C6.95 5.6 6 3 6 0C9.33333 0 12.1667 1.16667 14.5 3.5C16.8333 5.83333 18 8.66667 18 12Z"
            fill="currentColor"
          />
        </svg>
      </span>

      <h2 className={css.title}>Sign in to start your garden</h2>
      <p className={css.text}>
        Create a free account to track care, log watering and never lose a plant
        again.
      </p>

      <div className={css.actions}>
        <Link href="/login" className={`${css.button} ${css.login}`}>
          Log in
        </Link>
        <Link href="/register" className={`${css.button} ${css.register}`}>
          Create account
        </Link>
      </div>
    </Modal>
  );
}
