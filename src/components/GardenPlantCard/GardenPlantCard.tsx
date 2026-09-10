'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { waterPlant } from '@/lib/api/garden';
import type { GardenPlant, HealthStatus } from '@/types/garden';
import css from './GardenPlantCard.module.css';

const badgeClass: Record<HealthStatus, string> = {
  healthy: css.badgeHealthy,
  needs_attention: css.badgeAttention,
  critical: css.badgeCritical,
};

const badgeLabel: Record<HealthStatus, string> = {
  healthy: 'Healthy',
  needs_attention: 'Needs attention',
  critical: 'Critical',
};

const formatWatering = (iso: string) => {
  const date = new Date(iso);
  const today = new Date();

  const sameDay =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  if (sameDay) return 'Today';
  if (date < today) return 'Overdue';

  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
};

export default function GardenPlantCard({ plant }: { plant: GardenPlant }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => waterPlant(plant._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['garden'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success(`${plant.nickname} has been watered`);
    },
    onError: () => toast.error('Could not mark the plant as watered'),
  });

  const isUrgent = plant.healthStatus !== 'healthy';

  return (
    <article className={css.card}>
      <Link href={`/garden/${plant._id}`} className={css.photoLink}>
        <Image
          src={plant.photoUrl}
          alt={plant.nickname}
          fill
          sizes="(min-width: 1440px) 1312px, 100vw"
          className={css.photo}
        />
      </Link>

      <div className={css.body}>
        <div className={css.head}>
          <div className={css.names}>
            <Link href={`/garden/${plant._id}`} className={css.nickname}>
              {plant.nickname}
            </Link>
            <span className={css.species}>{plant.speciesName}</span>
          </div>

          <span className={`${css.badge} ${badgeClass[plant.healthStatus]}`}>
            {badgeLabel[plant.healthStatus]}
          </span>
        </div>

        <p className={css.watering}>
          <span className={css.wateringIcon}>
            <svg width="12" height="15" viewBox="0 0 12 15" fill="none">
              <path
                d="M6 14.25C4.3375 14.25 2.92188 13.675 1.75312 12.525C0.584375 11.375 0 9.975 0 8.325C0 7.5125 0.15625 6.75313 0.46875 6.04688C0.78125 5.34062 1.2125 4.7125 1.7625 4.1625L6 0L10.2375 4.1625C10.7875 4.7125 11.2188 5.34062 11.5312 6.04688C11.8438 6.75313 12 7.5125 12 8.325C12 9.975 11.4156 11.375 10.2469 12.525C9.07812 13.675 7.6625 14.25 6 14.25ZM1.5375 9H10.425C10.575 8.1 10.4906 7.33125 10.1719 6.69375C9.85312 6.05625 9.525 5.575 9.1875 5.25L6 2.1L2.8125 5.25C2.475 5.575 2.14375 6.05625 1.81875 6.69375C1.49375 7.33125 1.4 8.1 1.5375 9Z"
                fill="currentColor"
              />
            </svg>
          </span>
          Next watering: {formatWatering(plant.nextWateringAt)}
        </p>

        <button
          type="button"
          className={`${css.button} ${isUrgent ? css.buttonFilled : ''}`}
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Watering...' : 'Mark as watered'}
        </button>
      </div>
    </article>
  );
}
