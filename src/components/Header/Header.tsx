'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          Keep your plants alive
        </Link>

        <nav className={css.nav}>
          <ul className={css.navList}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${css.navLink} ${pathname === href ? css.navLinkActive : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={css.actions}>
          <Link href="/login" className={css.login}>
            Log in
          </Link>
          <Link href="/register" className={css.signup}>
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
