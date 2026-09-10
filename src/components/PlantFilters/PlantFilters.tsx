'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import css from './PlantFilters.module.css';

const groups = [
  {
    key: 'light',
    label: 'Light',
    options: [
      { value: '', label: 'Any light' },
      { value: 'full_sun', label: 'Full sun' },
      { value: 'bright_indirect', label: 'Bright indirect' },
      { value: 'low_light', label: 'Low light' },
    ],
  },
  {
    key: 'wateringFrequency',
    label: 'Watering',
    options: [
      { value: '', label: 'Any frequency' },
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'bi_weekly', label: 'Bi-weekly' },
      { value: 'monthly', label: 'Monthly' },
    ],
  },
  {
    key: 'toxicToPets',
    label: 'Pet-friendly',
    options: [
      { value: '', label: 'Any' },
      { value: 'false', label: 'Safe for pets' },
      { value: 'true', label: 'Toxic to pets' },
    ],
  },
  {
    key: 'difficulty',
    label: 'Difficulty',
    options: [
      { value: '', label: 'Any level' },
      { value: 'easy', label: 'Easy' },
      { value: 'medium', label: 'Medium' },
      { value: 'hard', label: 'Hard' },
    ],
  },
];

const sortOptions = [
  { value: 'difficulty', label: 'Difficulty' },
  { value: 'popularity', label: 'Popularity' },
];

export default function PlantFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchFromUrl = searchParams.get('search') ?? '';
  const [search, setSearch] = useState(searchFromUrl);

  const paramsRef = useRef(searchParams);
  paramsRef.current = searchParams;

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(paramsRef.current.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (search === searchFromUrl) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(paramsRef.current.toString());

      if (search) {
        params.set('search', search);
      } else {
        params.delete('search');
      }

      params.delete('page');
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timer);
  }, [search, searchFromUrl, pathname, router]);

  const handleReset = () => {
    setSearch('');
    router.push(pathname, { scroll: false });
  };

  return (
    <aside className={css.aside}>
      <div className={css.group}>
        <label className={css.label} htmlFor="search">
          Search
        </label>
        <div className={css.searchWrapper}>
          <input
            id="search"
            type="text"
            className={css.search}
            placeholder="Search by name..."
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
          <span className={css.searchIcon}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
      </div>

      {groups.map(({ key, label, options }) => {
        const current = searchParams.get(key) ?? '';

        return (
          <div key={key} className={css.group}>
            <p className={css.label}>{label}</p>
            <div className={css.options}>
              {options.map(option => (
                <button
                  key={option.label}
                  type="button"
                  className={`${css.chip} ${current === option.value ? css.chipActive : ''}`}
                  onClick={() => updateParam(key, option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <div className={css.group}>
        <p className={css.label}>Sort by</p>
        <div className={css.radioList}>
          {sortOptions.map(option => (
            <label key={option.value} className={css.radio}>
              <input
                type="radio"
                name="sortBy"
                className={css.radioInput}
                checked={searchParams.get('sortBy') === option.value}
                onChange={() => updateParam('sortBy', option.value)}
              />
              <span className={css.radioText}>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="button" className={css.reset} onClick={handleReset}>
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
          <path
            d="M0.816667 8.16667L0 7.35L3.26667 4.08333L0 0.816667L0.816667 0L4.08333 3.26667L7.35 0L8.16667 0.816667L4.9 4.08333L8.16667 7.35L7.35 8.16667L4.08333 4.9L0.816667 8.16667Z"
            fill="currentColor"
          />
        </svg>
        Clear filters
      </button>
    </aside>
  );
}
