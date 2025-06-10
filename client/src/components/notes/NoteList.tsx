import { useEffect } from 'react';
import NoteCard from './NoteCard';
import NoteSkeleton from './NoteSkeleton';
import type { Note } from '@/types';
import { useInView } from 'react-intersection-observer';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';

interface Props {
  notes: Note[];
  view?: 'grid' | 'list';
  isLoading?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export default function NoteList({
  notes,
  view = 'grid',
  isLoading = false,
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage = false,
}: Props) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && fetchNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {view === 'grid' ? (
        <Grid container spacing={2} mt={1}>
          {notes.map((note) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={note._id}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <NoteCard note={note} />
              </motion.div>
            </Grid>
          ))}

          {(isLoading || isFetchingNextPage) &&
            Array.from({ length: 3 }).map((_, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`skeleton-${i}`}>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <NoteSkeleton />
              </motion.div>
              </Grid>
            ))}
        </Grid>
      ) : (
        <Box mt={1}>
          {notes.map((note) => (
            <Box
              key={note._id}
              mb={2}
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <NoteCard note={note} />
            </Box>
          ))}

          {(isLoading || isFetchingNextPage) &&
            Array.from({ length: 3 }).map((_, i) => (
              <Box
                key={`skeleton-${i}`}
                mb={2}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <NoteSkeleton />
              </Box>
            ))}
        </Box>
      )}
      {hasNextPage && <Box ref={ref} height={4} mt={2} />}
    </>
  );
}
