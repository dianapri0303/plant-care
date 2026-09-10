'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserCard from '@/components/UserCard/UserCard';
import MyPlants from '@/components/MyPlants/MyPlants';
import { useAuthStore } from '@/store/authStore';
import css from './GardenView.module.css';

export default function GardenView() {
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isLoading = useAuthStore(state => state.isLoading);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <p className={css.status}>Loading...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={css.main}>
      <UserCard />
      <MyPlants />
    </div>
  );
}
