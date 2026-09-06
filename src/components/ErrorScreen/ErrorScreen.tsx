import { ReactNode } from 'react';
import css from './ErrorScreen.module.css';

interface ErrorScreenProps {
  code?: string;
  title: string;
  text: string;
  children: ReactNode;
}

export default function ErrorScreen({
  code,
  title,
  text,
  children,
}: ErrorScreenProps) {
  return (
    <section className={css.wrapper}>
      {code && <p className={css.code}>{code}</p>}
      <h1 className={css.title}>{title}</h1>
      <p className={css.text}>{text}</p>
      <div className={css.actions}>{children}</div>
    </section>
  );
}
