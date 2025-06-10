import { TextField, Box, Button } from '@mui/material';
import React from 'react';

interface Props {
  title: string;
  content: string;
  onChangeTitle: (val: string) => void;
  onChangeContent: (val: string) => void;
  onTyping: (field: 'title' | 'content') => void;
  onSave: () => void;
  onCancel: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isSaving: boolean;
}

export default function NoteEditor({
  title,
  content,
  onChangeTitle,
  onChangeContent,
  onTyping,
  onSave,
  onCancel,
  onKeyDown,
  isSaving,
}: Props) {
  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        value={title}
        onChange={(e) => {
          onChangeTitle(e.target.value);
          onTyping('title');
        }}
        onKeyDown={onKeyDown}
        sx={{ mb: 1 }}
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={content}
        onChange={(e) => {
          onChangeContent(e.target.value);
          onTyping('content');
        }}
        onKeyDown={onKeyDown}
      />
      <Box mt={2} display="flex" gap={1}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
}
