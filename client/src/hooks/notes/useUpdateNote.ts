import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/axios';
import type { UpdateNoteInput, UpdateNoteResponse } from '@/types';

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ _id, ...data }: UpdateNoteInput) =>
      api.put<UpdateNoteResponse>(`/notes/${_id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};
