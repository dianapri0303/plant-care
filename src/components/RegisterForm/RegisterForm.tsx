'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import FormField from '@/components/FormField/FormField';
import { register } from '@/lib/api/auth';
import { registerSchema } from '@/lib/validation/authSchemas';
import css from '@/components/AuthForm/AuthForm.module.css';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterForm() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      router.push('/garden');
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error('User with this email already exists');
        return;
      }
      toast.error('Something went wrong. Please try again.');
    },
  });

  const handleSubmit = (values: FormValues) => {
    mutation.mutate({ email: values.email, password: values.password });
  };

  return (
    <>
      <div className={css.header}>
        <h1 className={css.title}>
          Create your
          <br className={css.tabletBreak} /> account
        </h1>
        <p className={css.subtitle}>
          Start tracking your plants in
          <br className={css.tabletBreak} /> less than a minute.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="At least 8 characters"
          />
          <div className={css.lastField}>
            <FormField
              name="confirmPassword"
              label="Confirm password"
              type="password"
              placeholder="Repeat the password"
            />
          </div>

          <button
            type="submit"
            className={css.submit}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Creating account...' : 'Create account'}
          </button>

          <p className={css.crossLink}>
            Already have an account?{' '}
            <Link href="/login" className={css.crossLinkAccent}>
              Log in
            </Link>
          </p>
        </Form>
      </Formik>
    </>
  );
}
