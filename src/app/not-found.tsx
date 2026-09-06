import Link from 'next/link';
import ErrorScreen from '@/components/ErrorScreen/ErrorScreen';
import css from '@/components/Button/Button.module.css';

export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      title="This page has wilted"
      text="The page you are looking for doesn't exist or has been moved."
    >
      <Link href="/" className={`${css.base} ${css.primary}`}>
        Go to home
      </Link>
      <Link href="/catalog" className={`${css.base} ${css.secondary}`}>
        Browse catalog
      </Link>
    </ErrorScreen>
  );
}
