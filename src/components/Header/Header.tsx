'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import css from './Header.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
];

export default function Header() {
  const pathname = usePathname();
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isLoading = useAuthStore(state => state.isLoading);

  const initial = (user?.name || user?.email || '?').charAt(0).toUpperCase();

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
          {isLoading ? (
            <span className={css.actionsPlaceholder} />
          ) : isAuthenticated ? (
            <Link href="/garden" className={css.avatar} aria-label="My garden">
              {user?.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt=""
                  width={40}
                  height={40}
                  className={css.avatarImage}
                />
              ) : (
                <span className={css.avatarFallback}>{initial}</span>
              )}
            </Link>
          ) : (
            <>
              <Link href="/login" className={css.login}>
                Log in
              </Link>
              <Link href="/register" className={css.signup}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
