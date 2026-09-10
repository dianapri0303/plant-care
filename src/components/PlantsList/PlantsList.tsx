import type { Plant } from '@/types/plant';
import PlantCard from '@/components/PlantCard/PlantCard';
import css from './PlantsList.module.css';

export default function PlantsList({ plants }: { plants: Plant[] }) {
  return (
    <ul className={css.list}>
      {plants.map(plant => (
        <li key={plant._id}>
          <PlantCard plant={plant} />
        </li>
      ))}
    </ul>
  );
}
