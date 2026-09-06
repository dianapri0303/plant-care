import Link from 'next/link';
import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          Keep your plants alive
        </Link>
        <p className={css.copyright}>© 2025 Keep your plants alive</p>
      </div>
    </footer>
  );
}
