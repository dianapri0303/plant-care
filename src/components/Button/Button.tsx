import { ButtonHTMLAttributes, ReactNode } from 'react';
import css from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button className={`${css.base} ${css[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
