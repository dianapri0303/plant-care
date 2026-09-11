'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import GardenPlantCard from '@/components/GardenPlantCard/GardenPlantCard';
import ModalAddPlant from '@/components/ModalAddPlant/ModalAddPlant';
import { getGarden } from '@/lib/api/garden';
import css from './MyPlants.module.css';

const tabs = [
  { value: 'all', label: 'All plants' },
  { value: 'today', label: 'Need water today' },
  { value: 'soon', label: 'Need care soon' },
];

export default function MyPlants() {
  const [filter, setFilter] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const { data, isPending, isError } = useQuery({
    queryKey: ['garden', filter],
    queryFn: () => getGarden(filter),
  });

  return (
    <section className={css.wrapper}>
      <div className={css.head}>
        <h2 className={css.title}>My plants</h2>

        <button
          type="button"
          className={css.addButton}
          onClick={() => setIsAddOpen(true)}
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path
              d="M3.5 4.66667H0V3.5H3.5V0H4.66667V3.5H8.16667V4.66667H4.66667V8.16667H3.5V4.66667Z"
              fill="currentColor"
            />
          </svg>
          Add plant
        </button>
      </div>

      <div className={css.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.value}
            type="button"
            className={`${css.tab} ${filter === tab.value ? css.tabActive : ''}`}
            onClick={() => setFilter(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isPending && <p className={css.status}>Loading your plants...</p>}

      {isError && (
        <p className={`${css.status} ${css.error}`}>
          Couldn&apos;t load your garden. Please try again.
        </p>
      )}

      {data && data.length === 0 && (
        <p className={css.status}>
          No plants here yet. Add your first plant to get started.
        </p>
      )}

      {data && data.length > 0 && (
        <div className={css.list}>
          {data.map(plant => (
            <GardenPlantCard key={plant._id} plant={plant} />
          ))}
        </div>
      )}

      {isAddOpen && <ModalAddPlant onClose={() => setIsAddOpen(false)} />}
    </section>
  );
}
