import Image from 'next/image';
import { ReactNode } from 'react';
import css from './AuthLayout.module.css';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className={css.section}>
      <div className={css.card}>
        <div className={css.illustration}>
          <div className={css.imageWrapper}>
            <Image
              src="/plant-block.png"
              alt="Illustration of a monstera plant in a terracotta pot"
              fill
              sizes="(min-width: 1440px) 50vw, 100vw"
              className={css.image}
            />
            <span className={css.overlay} />
          </div>
        </div>

        <div className={css.panel}>
          <div className={css.content}>{children}</div>
        </div>
      </div>
    </section>
  );
}
