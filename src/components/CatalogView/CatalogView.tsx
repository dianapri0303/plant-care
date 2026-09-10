'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import PlantFilters from '@/components/PlantFilters/PlantFilters';
import PlantsList from '@/components/PlantsList/PlantsList';
import Pagination from '@/components/Pagination/Pagination';
import EmptyState from '@/components/EmptyState/EmptyState';
import { getCatalog } from '@/lib/api/catalog';
import type { CatalogParams } from '@/types/plant';
import css from './CatalogView.module.css';

export default function CatalogView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const params: CatalogParams = {
    page,
    limit: 12,
    search: searchParams.get('search') || undefined,
    light: (searchParams.get('light') as CatalogParams['light']) || undefined,
    wateringFrequency:
      (searchParams.get(
        'wateringFrequency',
      ) as CatalogParams['wateringFrequency']) || undefined,
    difficulty:
      (searchParams.get('difficulty') as CatalogParams['difficulty']) ||
      undefined,
    sortBy:
      (searchParams.get('sortBy') as CatalogParams['sortBy']) || undefined,
    toxicToPets: searchParams.get('toxicToPets')
      ? searchParams.get('toxicToPets') === 'true'
      : undefined,
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ['catalog', params],
    queryFn: () => getCatalog(params),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('page', String(nextPage));
    router.push(`${pathname}?${next.toString()}`);
  };

  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <section className={css.section}>
      <div className={css.header}>
        <h1 className={css.title}>Plant catalog</h1>
        <p className={css.subtitle}>
          Browse houseplants and find species that fit your space.
        </p>
      </div>

      <div className={css.layout}>
        <div className={css.aside}>
          <PlantFilters />
        </div>

        <div className={css.content}>
          {isPending && <p className={css.status}>Loading plants...</p>}

          {isError && (
            <p className={`${css.status} ${css.error}`}>
              Couldn&apos;t load the catalog. Please try again.
            </p>
          )}

          {data && data.plants.length === 0 && (
            <EmptyState onReset={handleReset} />
          )}

          {data && data.plants.length > 0 && (
            <>
              <PlantsList plants={data.plants} />
              <Pagination
                currentPage={data.currentPage}
                totalPages={data.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
