'use client';

import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ArrowIcon = () => (
  <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
    <path
      d="M4.6 6L0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6Z"
      fill="currentColor"
    />
  </svg>
);

const buildPages = (current: number, total: number): (number | 'dots')[] => {
  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 'dots', total];
  }

  if (current >= total - 2) {
    return [1, 'dots', total - 2, total - 1, total];
  }

  return [1, 'dots', current, 'dots', total];
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPages(currentPage, totalPages);

  return (
    <nav className={css.pagination} aria-label="Catalog pages">
      <button
        type="button"
        className={`${css.button} ${css.arrow} ${css.prev}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ArrowIcon />
      </button>

      {pages.map((page, index) =>
        page === 'dots' ? (
          <span key={`dots-${index}`} className={css.dots}>
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            className={`${css.button} ${page === currentPage ? css.buttonActive : ''}`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        className={`${css.button} ${css.arrow}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ArrowIcon />
      </button>
    </nav>
  );
}
