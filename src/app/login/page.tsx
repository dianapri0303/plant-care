import type { Metadata } from 'next';
import AuthLayout from '@/components/AuthLayout/AuthLayout';
import LoginForm from '@/components/LoginForm/LoginForm';

export const metadata: Metadata = {
  title: 'Log in | Keep your plants alive',
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
