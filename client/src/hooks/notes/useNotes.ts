import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/services/axios';
import type { PaginatedNotesResponse } from '@/types';

const LIMIT = 12;

export const useNotes = () => {
  return useInfiniteQuery<PaginatedNotesResponse>({
    queryKey: ['notes'],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get<PaginatedNotesResponse>(`/notes?page=${pageParam}&limit=${LIMIT}`);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      return pagination.page < pagination.totalPages ? pagination.page + 1 : undefined;
    },
  });
};
