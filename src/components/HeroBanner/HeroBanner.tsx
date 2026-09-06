import Image from 'next/image';
import Link from 'next/link';
import css from './HeroBanner.module.css';

export default function HeroBanner() {
  return (
    <section className={css.hero}>
      <Image
        src="/hero.png"
        alt="Houseplants in ceramic pots on wooden shelves"
        fill
        priority
        sizes="100vw"
        className={css.image}
      />
      <div className={css.overlay} />

      <div className={css.container}>
        <div className={css.content}>
          <h1 className={css.title}>Keep your plants alive</h1>
          <p className={css.text}>
            Turn your home into a thriving indoor garden. We provide the tools
            and knowledge to help your botanical friends flourish, one drop at a
            time.
          </p>
          <Link href="/register" className={css.button}>
            Start your garden
          </Link>
        </div>
      </div>
    </section>
  );
}
