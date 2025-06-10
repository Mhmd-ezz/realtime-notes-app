import { useForm } from 'react-hook-form';
import { useCreateNote } from '@/hooks/notes/useCreateNote';
import {
  Button,
  Stack,
  TextField,
  Paper,
} from '@mui/material';
import { toast } from 'react-toastify';

interface CreateNoteFormValues {
  title: string;
  content: string;
}

interface Props {
  onClose?: () => void;
}

export default function CreateNoteForm({ onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNoteFormValues>();

  const createNote = useCreateNote();

  const onSubmit = (data: CreateNoteFormValues) => {
    createNote.mutate(data, {
      onSuccess: () => {
        toast.dismiss();
        toast.success('Note created successfully');
        reset({ title: '', content: '' });
        onClose?.();
      },
      onError: () => {
        toast.dismiss();
        toast.error('Failed to create note');
      },
    });
  };

  const handleCancel = () => {
    reset({ title: '', content: '' });
    onClose?.();
  };

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register('title', { required: 'Title is required' })}
          />
          <TextField
            label="Content"
            multiline
            rows={4}
            fullWidth
            error={!!errors.content}
            helperText={errors.content?.message}
            {...register('content', { required: 'Content is required' })}
          />
          {/* <FormControlLabel
            control={<Checkbox {...register('isPublic')} />}
            label="Make this note public"
          /> */}
          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={createNote.isPending}
            >
              {createNote.isPending ? 'Creating...' : 'Add Note'}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleCancel}
              disabled={createNote.isPending}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
