'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ModalEditPlant from '@/components/ModalEditPlant/ModalEditPlant';
import ModalConfirm from '@/components/ModalConfirm/ModalConfirm';
import { getGardenPlantById, waterPlant, deletePlant } from '@/lib/api/garden';
import css from './PlantCardView.module.css';

const DAY = 1000 * 60 * 60 * 24;

const LeafIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path
      d="M6.1875 12.7685C5.775 12.7685 5.35938 12.7217 4.94063 12.6279C4.52188 12.5342 4.09375 12.3998 3.65625 12.2248C3.80625 10.7123 4.24375 9.29979 4.96875 7.98729C5.69375 6.67479 6.625 5.51854 7.7625 4.51854C6.3875 5.21854 5.19688 6.14354 4.19063 7.29354C3.18438 8.44354 2.48125 9.75604 2.08125 11.231C2.03125 11.1935 1.98438 11.1529 1.94062 11.1092C1.89687 11.0654 1.85 11.0185 1.8 10.9685C1.2125 10.381 0.765625 9.72479 0.459375 8.99979C0.153125 8.27479 0 7.51854 0 6.73104C0 5.88104 0.16875 5.06854 0.50625 4.29354C0.84375 3.51854 1.3125 2.83104 1.9125 2.23104C2.925 1.21854 4.2375 0.559164 5.85 0.252914C7.4625 -0.0533357 9.725 -0.0814607 12.6375 0.168539C12.8625 3.15604 12.825 5.43416 12.525 7.00291C12.225 8.57166 11.575 9.85604 10.575 10.856C9.9625 11.4685 9.27813 11.9404 8.52188 12.2717C7.76563 12.6029 6.9875 12.7685 6.1875 12.7685Z"
      fill="currentColor"
    />
  </svg>
);

const WindowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2ZM10 10V16H16V10H10ZM10 8H16V2H10V8ZM8 8V2H2V8H8ZM8 10H2V16H8V10Z"
      fill="currentColor"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
    <path
      d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6Z"
      fill="currentColor"
    />
  </svg>
);

const DropIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={(size * 20) / 16} viewBox="0 0 16 20" fill="none">
    <path
      d="M8.275 17C8.475 16.9833 8.64583 16.9042 8.7875 16.7625C8.92917 16.6208 9 16.45 9 16.25C9 16.0167 8.925 15.8292 8.775 15.6875C8.625 15.5458 8.43333 15.4833 8.2 15.5C7.51667 15.55 6.79167 15.3625 6.025 14.9375C5.25833 14.5125 4.775 13.7417 4.575 12.625C4.54167 12.4417 4.45417 12.2917 4.3125 12.175C4.17083 12.0583 4.00833 12 3.825 12C3.59167 12 3.4 12.0875 3.25 12.2625C3.1 12.4375 3.05 12.6417 3.1 12.875C3.38333 14.3917 4.05 15.475 5.1 16.125C6.15 16.775 7.20833 17.0667 8.275 17ZM8 20C5.71667 20 3.8125 19.2167 2.2875 17.65C0.7625 16.0833 0 14.1333 0 11.8C0 10.1333 0.6625 8.32083 1.9875 6.3625C3.3125 4.40417 5.31667 2.28333 8 0C10.6833 2.28333 12.6875 4.40417 14.0125 6.3625C15.3375 8.32083 16 10.1333 16 11.8C16 14.1333 15.2375 16.0833 13.7125 17.65C12.1875 19.2167 10.2833 20 8 20Z"
      fill="currentColor"
    />
  </svg>
);

const PencilIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.6208 0.25 13.8625 0.15C14.1042 0.05 14.3583 0 14.625 0C14.8917 0 15.15 0.05 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15 18 3.4C18 3.66667 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L4.25 18H0Z"
      fill="currentColor"
    />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
    <path
      d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
      fill="currentColor"
    />
  </svg>
);

const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path
      d="M6.75 11.25H8.25V8.25H11.25V6.75H8.25V3.75H6.75V6.75H3.75V8.25H6.75V11.25ZM7.5 15C6.4625 15 5.4875 14.8031 4.575 14.4094C3.6625 14.0156 2.86875 13.4812 2.19375 12.8062C1.51875 12.1312 0.984375 11.3375 0.590625 10.425C0.196875 9.5125 0 8.5375 0 7.5C0 6.4625 0.196875 5.4875 0.590625 4.575C0.984375 3.6625 1.51875 2.86875 2.19375 2.19375C2.86875 1.51875 3.6625 0.984375 4.575 0.590625C5.4875 0.196875 6.4625 0 7.5 0C8.5375 0 9.5125 0.196875 10.425 0.590625C11.3375 0.984375 12.1312 1.51875 12.8062 2.19375C13.4812 2.86875 14.0156 3.6625 14.4094 4.575C14.8031 5.4875 15 6.4625 15 7.5C15 8.5375 14.8031 9.5125 14.4094 10.425C14.0156 11.3375 13.4812 12.1312 12.8062 12.8062C12.1312 13.4812 11.3375 14.0156 10.425 14.4094C9.5125 14.8031 8.5375 15 7.5 15ZM7.5 13.5C9.175 13.5 10.5938 12.9188 11.7563 11.7563C12.9188 10.5938 13.5 9.175 13.5 7.5C13.5 5.825 12.9188 4.40625 11.7563 3.24375C10.5938 2.08125 9.175 1.5 7.5 1.5C5.825 1.5 4.40625 2.08125 3.24375 3.24375C2.08125 4.40625 1.5 5.825 1.5 7.5C1.5 9.175 2.08125 10.5938 3.24375 11.7563C4.40625 12.9188 5.825 13.5 7.5 13.5Z"
      fill="currentColor"
    />
  </svg>
);

const daysAgo = (iso: string) => {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / DAY);
  if (diff <= 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return `${diff} days ago`;
};

export default function PlantCardView({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => deletePlant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['garden'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('Plant removed');
      router.push('/garden');
    },
    onError: () => toast.error('Could not remove the plant'),
  });

  const {
    data: plant,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['garden', 'plant', id],
    queryFn: () => getGardenPlantById(id),
  });

  const mutation = useMutation({
    mutationFn: () => waterPlant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['garden'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('Watering logged');
    },
    onError: () => toast.error('Could not log the watering'),
  });

  if (isPending) return <p className={css.status}>Loading plant...</p>;

  if (isError || !plant) {
    return (
      <p className={`${css.status} ${css.error}`}>
        Couldn&apos;t load this plant. Please try again.
      </p>
    );
  }

  const logs = plant.wateringLogs ?? [];
  const lastWatered = logs[0]?.wateredAt;

  const msLeft = new Date(plant.nextWateringAt).getTime() - Date.now();
  const daysLeft = Math.ceil(msLeft / DAY);
  const moisture = Math.max(
    0,
    Math.min(100, Math.round((daysLeft / plant.wateringFrequencyDays) * 100)),
  );

  const moistureLabel =
    moisture >= 60 ? 'Optimal' : moisture >= 30 ? 'Moderate' : 'Needs water';
  const isHealthy = daysLeft > 0;

  const acquired = new Date(plant.acquiredAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={css.main}>
      <div className={css.hero}>
        <div className={css.photoBox}>
          <div className={css.photo}>
            <Image
              src={plant.photoUrl}
              alt={plant.nickname}
              fill
              sizes="(min-width: 1440px) 448px, 100vw"
              className={css.photoImage}
              priority
            />
          </div>
          <span className={css.badge}>
            <LeafIcon />
            {isHealthy ? 'Healthy' : 'Needs attention'}
          </span>
        </div>

        <div className={css.info}>
          <nav className={css.breadcrumbs}>
            <Link href="/garden" className={css.crumbLink}>
              My Garden
            </Link>
            <span className={css.crumbLink}>/</span>
            <span className={css.crumbCurrent}>{plant.nickname}</span>
          </nav>

          <h1 className={css.title}>{plant.nickname}</h1>
          <p className={css.species}>{plant.speciesName}</p>

          <div className={css.meta}>
            <p className={css.metaRow}>
              <span className={css.metaIcon}>
                <WindowIcon />
              </span>
              In the {plant.location.toLowerCase()}
            </p>
            <p className={css.metaRow}>
              <span className={css.metaIcon}>
                <CalendarIcon />
              </span>
              Since {acquired}
            </p>
            <p className={css.metaRow}>
              <span className={css.metaIcon}>
                <DropIcon />
              </span>
              Water every {plant.wateringFrequencyDays} days
            </p>
          </div>

          <div className={css.quickStats}>
            <div className={css.statBox}>
              <span className={css.statLabel}>Last watered</span>
              <span className={css.statValue}>
                {lastWatered ? daysAgo(lastWatered) : 'Not yet'}
              </span>
            </div>

            <div className={css.statBox}>
              <span className={css.statLabel}>Moisture level</span>
              <div className={css.bar}>
                <div
                  className={css.barFill}
                  style={{ width: `${moisture}%` }}
                />
              </div>
              <span className={css.statSmall}>{moistureLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={`${css.actionButton} ${css.actionPrimary}`}
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          <DropIcon />
          {mutation.isPending ? 'Saving...' : 'Mark watered'}
        </button>

        <button
          type="button"
          className={`${css.actionButton} ${css.actionSecondary}`}
          onClick={() => setIsEditOpen(true)}
        >
          <PencilIcon />
          Edit info
        </button>

        <button
          type="button"
          className={`${css.actionButton} ${css.actionDanger}`}
          onClick={() => setIsConfirmOpen(true)}
        >
          <TrashIcon />
          Remove
        </button>
      </div>

      <section className={css.journal}>
        <div className={css.journalHead}>
          <h2 className={css.journalTitle}>Care journal</h2>
          <button
            type="button"
            className={css.addEntry}
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            <PlusIcon />
            Add entry
          </button>
        </div>

        {logs.length === 0 ? (
          <p className={css.empty}>
            No entries yet. Water your plant to start.
          </p>
        ) : (
          <ul className={css.logList}>
            {logs.map(log => (
              <li key={log._id} className={css.logEntry}>
                <span className={css.logIcon}>
                  <DropIcon />
                </span>
                <span className={css.logBody}>
                  <span className={css.logDate}>
                    {new Date(log.wateredAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className={css.logText}>Watered</span>
                </span>
                <span className={css.logTag}>Routine</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      {isEditOpen && (
        <ModalEditPlant plant={plant} onClose={() => setIsEditOpen(false)} />
      )}

      {isConfirmOpen && (
        <ModalConfirm
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => deleteMutation.mutate()}
          isPending={deleteMutation.isPending}
        />
      )}
    </div>
  );
}
