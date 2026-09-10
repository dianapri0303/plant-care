'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getUserStats } from '@/lib/api/garden';
import { updateProfile, logout } from '@/lib/api/auth';
import { useAuthStore } from '@/store/authStore';
import css from './UserCard.module.css';

const profileSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  phone: Yup.string().matches(/^\+\d{10,15}$/, {
    message: 'International format, starts with +',
    excludeEmptyString: true,
  }),
});

const PersonIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <path
      d="M39.7241 39.7241C34.2621 39.7241 29.5862 37.7793 25.6966 33.8897C21.8069 30 19.8621 25.3241 19.8621 19.8621C19.8621 14.4 21.8069 9.72414 25.6966 5.83448C29.5862 1.94483 34.2621 0 39.7241 0C45.1862 0 49.8621 1.94483 53.7517 5.83448C57.6414 9.72414 59.5862 14.4 59.5862 19.8621C59.5862 25.3241 57.6414 30 53.7517 33.8897C49.8621 37.7793 45.1862 39.7241 39.7241 39.7241ZM0 79.4483V65.5448C0 62.731 0.724138 60.1448 2.17241 57.7862C3.62069 55.4276 5.54483 53.6276 7.94483 52.3862C13.0759 49.8207 18.2897 47.8966 23.5862 46.6138C28.8828 45.331 34.2621 44.6897 39.7241 44.6897C45.1862 44.6897 50.5655 45.331 55.8621 46.6138C61.1586 47.8966 66.3724 49.8207 71.5034 52.3862C73.9035 53.6276 75.8276 55.4276 77.2759 57.7862C78.7241 60.1448 79.4483 62.731 79.4483 65.5448V79.4483H0ZM9.93104 69.5172H69.5172V65.5448C69.5172 64.6345 69.2897 63.8069 68.8345 63.0621C68.3793 62.3172 67.7793 61.7379 67.0345 61.3241C62.5655 59.0897 58.0552 57.4138 53.5034 56.2966C48.9517 55.1793 44.3586 54.6207 39.7241 54.6207C35.0897 54.6207 30.4966 55.1793 25.9448 56.2966C21.3931 57.4138 16.8828 59.0897 12.4138 61.3241C11.669 61.7379 11.069 62.3172 10.6138 63.0621C10.1586 63.8069 9.93104 64.6345 9.93104 65.5448V69.5172ZM39.7241 29.7931C42.4552 29.7931 44.7931 28.8207 46.7379 26.8759C48.6828 24.931 49.6552 22.5931 49.6552 19.8621C49.6552 17.131 48.6828 14.7931 46.7379 12.8483C44.7931 10.9034 42.4552 9.93104 39.7241 9.93104C36.9931 9.93104 34.6552 10.9034 32.7103 12.8483C30.7655 14.7931 29.7931 17.131 29.7931 19.8621C29.7931 22.5931 30.7655 24.931 32.7103 26.8759C34.6552 28.8207 36.9931 29.7931 39.7241 29.7931Z"
      fill="currentColor"
    />
  </svg>
);

export default function UserCard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const clearAuth = useAuthStore(state => state.clearAuth);

  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: getUserStats,
  });

  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: updated => {
      setUser(updated);
      setPhoto(null);
      toast.success('Profile updated');
    },
    onError: () => toast.error('Could not update the profile'),
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      router.push('/');
    },
    onError: () => toast.error('Could not log out'),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (values: { name: string; phone: string }) => {
    const data = new FormData();
    if (values.name) data.append('name', values.name);
    if (values.phone) data.append('phone', values.phone);
    if (photo) data.append('photo', photo);
    profileMutation.mutate(data);
  };

  const avatarSrc = preview || user?.avatarUrl;

  return (
    <div className={css.wrapper}>
      <div className={css.card}>
        <Formik
          initialValues={{ name: user?.name ?? '', phone: user?.phone ?? '' }}
          validationSchema={profileSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form className={css.form}>
            <div className={css.top}>
              <div className={css.form}>
                <div className={css.field}>
                  <label className={css.label} htmlFor="name">
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    placeholder="Your name"
                    className={css.input}
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className={css.error}
                  />
                </div>

                <div className={css.field}>
                  <label className={css.label} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user?.email ?? ''}
                    className={css.input}
                    disabled
                    readOnly
                  />
                  <p className={css.hint}>Email can&apos;t be changed</p>
                </div>

                <div className={css.field}>
                  <label className={css.label} htmlFor="phone">
                    Phone
                  </label>
                  <Field
                    id="phone"
                    name="phone"
                    placeholder="+380..."
                    className={css.input}
                  />
                  <ErrorMessage
                    name="phone"
                    component="p"
                    className={css.error}
                  />
                  <p className={css.hint}>
                    International format, starts with +
                  </p>
                </div>
              </div>

              <div className={css.avatarWrapper}>
                <div className={css.avatar}>
                  {avatarSrc ? (
                    <Image
                      src={avatarSrc}
                      alt=""
                      width={144}
                      height={144}
                      className={css.avatarImage}
                      unoptimized={Boolean(preview)}
                    />
                  ) : (
                    <PersonIcon />
                  )}
                </div>

                <button
                  type="button"
                  className={css.editPhoto}
                  onClick={() => fileRef.current?.click()}
                  aria-label="Change photo"
                >
                  <svg viewBox="0 0 25 25" fill="none">
                    <path
                      d="M2.75862 22.069H4.72414L18.2069 8.58621L16.2414 6.62069L2.75862 20.1034V22.069ZM0 24.8276V18.9655L18.2069 0.793103C18.4828 0.54023 18.7874 0.344828 19.1207 0.206897C19.454 0.0689655 19.8046 0 20.1724 0C20.5402 0 20.8966 0.0689655 21.2414 0.206897C21.5862 0.344828 21.8851 0.551724 22.1379 0.827586L24.0345 2.75862C24.3103 3.01149 24.5115 3.31034 24.6379 3.65517C24.7644 4 24.8276 4.34483 24.8276 4.68966C24.8276 5.05747 24.7644 5.40805 24.6379 5.74138C24.5115 6.07471 24.3103 6.37931 24.0345 6.65517L5.86207 24.8276H0Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className={css.fileInput}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className={css.stats}>
              <div className={css.stat}>
                <span className={css.statValue}>{stats?.plantCount ?? 0}</span>
                <span className={css.statLabel}>Plants in garden</span>
              </div>
              <div className={`${css.stat} ${css.statPeach}`}>
                <span className={css.statValue}>
                  {stats?.wateringStreak ?? 0}
                </span>
                <span className={css.statLabel}>Day watering streak</span>
              </div>
            </div>

            <button
              type="submit"
              className={css.submit}
              disabled={profileMutation.isPending}
            >
              {profileMutation.isPending ? 'Saving...' : 'save changes'}
            </button>
          </Form>
        </Formik>
      </div>

      <button
        type="button"
        className={css.logout}
        onClick={() => logoutMutation.mutate()}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H9V2H2V16H9V18H2ZM13 14L11.625 12.55L14.175 10H6V8H14.175L11.625 5.45L13 4L18 9L13 14Z"
            fill="currentColor"
          />
        </svg>
        Log out
      </button>
    </div>
  );
}
