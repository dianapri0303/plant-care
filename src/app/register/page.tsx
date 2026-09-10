import type { Metadata } from 'next';
import AuthLayout from '@/components/AuthLayout/AuthLayout';
import RegisterForm from '@/components/RegisterForm/RegisterForm';

export const metadata: Metadata = {
  title: 'Create your account | Keep your plants alive',
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
