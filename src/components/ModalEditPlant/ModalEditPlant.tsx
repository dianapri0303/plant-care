'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PlantForm, {
  type PlantFormValues,
} from '@/components/PlantForm/PlantForm';
import { updatePlant } from '@/lib/api/garden';
import type { GardenPlant } from '@/types/garden';

interface Props {
  plant: GardenPlant;
  onClose: () => void;
}

export default function ModalEditPlant({ plant, onClose }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: PlantFormValues) =>
      updatePlant(plant._id, {
        nickname: values.nickname,
        speciesId: values.speciesId,
        location: values.location,
        wateringFrequencyDays: values.wateringFrequencyDays,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['garden'] });
      toast.success('Changes saved');
      onClose();
    },
    onError: () => toast.error('Could not save the changes'),
  });

  return (
    <PlantForm
      title="Edit plant"
      submitLabel="Save changes"
      plant={plant}
      isPending={mutation.isPending}
      onClose={onClose}
      onSubmit={values => mutation.mutate(values)}
    />
  );
}
