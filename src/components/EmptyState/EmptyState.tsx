import css from './EmptyState.module.css';

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className={css.wrapper}>
      <div className={css.illustration} aria-hidden="true">
        <div className={css.pot} />
        <div className={css.soil}>
          <span className={css.dot} />
          <span className={css.dot} />
          <span className={css.dot} />
        </div>
      </div>

      <h2 className={css.title}>No plants match your criteria</h2>
      <p className={css.text}>
        Try adjusting the filters or clearing the search to find your next green
        companion.
      </p>

      <button type="button" className={css.button} onClick={onReset}>
        Clear filters
      </button>
    </div>
  );
}
