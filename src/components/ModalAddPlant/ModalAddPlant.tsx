'use client';

import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PlantForm, {
  type PlantFormValues,
} from '@/components/PlantForm/PlantForm';
import { addPlant } from '@/lib/api/garden';

export default function ModalAddPlant({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addPlant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['garden'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('Plant added to your garden');
      onClose();
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === 413) {
        toast.error('Photo is too large. Please choose a smaller file.');
        return;
      }
      toast.error('Could not add the plant');
    },
  });

  const handleSubmit = (values: PlantFormValues, photo: File | null) => {
    if (!photo) {
      toast.error('Please choose a photo');
      return;
    }

    const data = new FormData();
    data.append('speciesId', values.speciesId);
    data.append('nickname', values.nickname);
    data.append('location', values.location);
    data.append('acquiredAt', new Date(values.acquiredAt).toISOString());
    data.append('wateringFrequencyDays', String(values.wateringFrequencyDays));
    data.append('photo', photo);

    mutation.mutate(data);
  };

  return (
    <PlantForm
      title="Add a new plant"
      submitLabel="Add to garden"
      isPending={mutation.isPending}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
