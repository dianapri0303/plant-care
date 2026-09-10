'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import FormField from '@/components/FormField/FormField';
import { login } from '@/lib/api/auth';
import { loginSchema } from '@/lib/validation/authSchemas';
import { useAuthStore } from '@/store/authStore';
import css from '@/components/AuthForm/AuthForm.module.css';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: user => {
      setUser(user);
      router.push('/garden');
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error('Invalid email or password');
        return;
      }
      toast.error('Something went wrong. Please try again.');
    },
  });

  return (
    <>
      <div className={css.header}>
        <h1 className={css.title}>Welcome back</h1>
        <p className={css.subtitle}>
          Log in to check on your
          <br className={css.tabletBreak} /> plants.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={values => mutation.mutate(values)}
      >
        <Form className={css.form}>
          <FormField
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
          />
          <div className={css.lastField}>
            <FormField
              name="password"
              label="Password"
              type="password"
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            className={css.submit}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Logging in...' : 'Log in'}
          </button>

          <p className={`${css.crossLink} ${css.crossLinkBordered}`}>
            Don&apos;t have an account yet?{' '}
            <Link href="/register" className={css.crossLinkUnderlined}>
              Register
            </Link>
          </p>
        </Form>
      </Formik>
    </>
  );
}
