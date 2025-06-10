import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/axios';
import type { CreateNoteInput, CreateNoteResponse } from '@/types';

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNoteInput) => api.post<CreateNoteResponse>('/notes', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] }); // refresh list
    },
  });
};
