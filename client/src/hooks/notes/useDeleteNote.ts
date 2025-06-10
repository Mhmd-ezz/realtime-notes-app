import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/axios';
import socket from '@/services/socket';

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: string) => api.delete(`/notes/${noteId}`),
    onSuccess: (_, noteId) => {
      socket.emit('note:delete', noteId); 
      queryClient.invalidateQueries({ queryKey: ['notes'] }); 
    },
  });
};
