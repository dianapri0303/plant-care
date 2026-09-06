'use client';

import Button from '@/components/Button/Button';
import ErrorScreen from '@/components/ErrorScreen/ErrorScreen';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <ErrorScreen
      title="Something went wrong"
      text="We couldn't load this page. Please try again in a moment."
    >
      <Button onClick={reset}>Try again</Button>
    </ErrorScreen>
  );
}
