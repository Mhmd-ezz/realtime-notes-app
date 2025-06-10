import { useState } from 'react';
import { useNotes } from '@/hooks/notes/useNotes';
import { useNotesSocket } from '@/hooks/notes/useNotesSocket';
import { useEditingSync } from '@/hooks/notes/useEditingSync';
import NoteList from '@/components/notes/NoteList';
import CreateNoteForm from '@/components/notes/CreateNoteForm';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useNotesSocket();
  useEditingSync();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useNotes();

  const notes = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <Stack spacing={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          Your Notes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Note
        </Button>
      </Stack>

      {isError ? (
        <Typography color="error">Failed to load notes.</Typography>
      ) : (
        <NoteList
          notes={notes}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
        />
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Create New Note
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            ✕
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CreateNoteForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
