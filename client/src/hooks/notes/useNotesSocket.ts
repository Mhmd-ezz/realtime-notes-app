import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useEffect } from 'react';
import socket from '@/services/socket';
import type { Note, PaginatedNotesResponse } from '@/types/note';

export const useNotesSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('note:created', (note: Note) => {
      queryClient.setQueryData<InfiniteData<PaginatedNotesResponse>>(['notes'], (oldData) => {
        if (!oldData) return oldData;

        const exists = oldData.pages.some((page) =>
          page.data.some((n) => n._id === note._id)
        );
        if (exists) return oldData;

        return {
          ...oldData,
          pages: [
            {
              ...oldData.pages[0],
              data: [note, ...oldData.pages[0].data],
            },
            ...oldData.pages.slice(1),
          ],
        };
      });
    });

    socket.on('note:updated', (updatedNote: Note) => {
      queryClient.setQueryData<InfiniteData<PaginatedNotesResponse>>(['notes'], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: page.data.map((note) =>
              note._id === updatedNote._id ? updatedNote : note
            ),
          })),
        };
      });
    });

    socket.on('note:deleted', (noteId: string) => {
      queryClient.setQueryData<InfiniteData<PaginatedNotesResponse>>(['notes'], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: page.data.filter((note) => note._id !== noteId),
          })),
        };
      });
    });

    return () => {
      socket.off('note:created');
      socket.off('note:updated');
      socket.off('note:deleted');
    };
  }, [queryClient]);
};
