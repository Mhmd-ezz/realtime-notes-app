import type { Note, PaginatedNotesResponse } from '@/types';
import { memo, useEffect, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { useEditingContext } from '@/hooks/notes/useEditingContext';
import { useUpdateNote } from '@/hooks/notes/useUpdateNote';
import { useDeleteNote } from '@/hooks/notes/useDeleteNote';
import socket from '@/services/socket';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import NoteDisplay from './NoteDisplay';
import NoteEditor from './NoteEditor';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';

interface Props {
  note: Note;
}

const autoSaveInterval = 10000;

function NoteCard({ note }: Props) {
  const queryClient = useQueryClient();
  const user = useCurrentUser();
  const { editingMap } = useEditingContext();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [lastSavedTitle, setLastSavedTitle] = useState(note.title);
  const [lastSavedContent, setLastSavedContent] = useState(note.content);

  useEffect(() => {
    if (!isEditing) return;
    const interval = setInterval(() => {
      const hasChanges =
        title !== lastSavedTitle || content !== lastSavedContent;
      if (hasChanges) {
        updateNote.mutate(
          { _id: note._id, title, content },
          {
            onSuccess: () => {
              toast.dismiss();
              toast.success('Note updated');
            },
            onError: () => {
              toast.dismiss();
              toast.error('Update failed');
            },
          }
        );
        setLastSavedTitle(title);
        setLastSavedContent(content);
      }
    }, autoSaveInterval);
    return () => clearInterval(interval);
  }, [isEditing, title, content, lastSavedTitle, lastSavedContent, updateNote, note._id]);

  const debouncedTyping = useDebouncedCallback(
  (field: 'title' | 'content') => {
    socket.emit('note:typing', {
      noteId: note._id,
      user: user?.name,
      field,
    });
  },
  400
);


  const handleChangeTitle = (val: string) => {
    setTitle(val);
    debouncedTyping('title');
  };

  const handleChangeContent = (val: string) => {
    setContent(val);
    debouncedTyping('content');
  };

  const handleSave = () => {
    socket.emit('note:stop-editing', { noteId: note._id });
    if (title !== note.title || content !== note.content) {
      updateNote.mutate({ _id: note._id, title, content });
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setTitle(note.title);
    setContent(note.content);
    socket.emit('note:stop-editing', { noteId: note._id });
    setIsEditing(false);
  };

  const handleEdit = () => {
    const editor = editingMap[note._id];
    if (editor && editor !== user?.name) return;
    const latestNote = queryClient
      .getQueryData<InfiniteData<PaginatedNotesResponse>>(['notes'])
      ?.pages.flatMap(page => page.data)
      .find(n => n._id === note._id);
    if (latestNote) {
      setTitle(latestNote.title);
      setContent(latestNote.content);
    }
    socket.emit('note:editing', { noteId: note._id, user: user?.name });
    setIsEditing(true);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This note will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      title: 'Deleting...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    deleteNote.mutate(note._id, {
      onSuccess: () => {
        Swal.close();
        toast.dismiss();
        toast.success('Note deleted successfully');
      },
      onError: () => {
        Swal.close();
        toast.dismiss();
        toast.error('Failed to delete note');
      },
    });
  };

  const handleTyping = (field: 'title' | 'content') => {
    debouncedTyping(field);
  };

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        {isEditing ? (
          <NoteEditor
            title={title}
            content={content}
            onChangeTitle={handleChangeTitle}
            onChangeContent={handleChangeContent}
            onTyping={handleTyping}
            onCancel={cancelEdit}
            onSave={handleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSave();
              }
            }}
            isSaving={updateNote.isPending}
          />
        ) : (
          <NoteDisplay
            note={note}
            isBeingEditedBy={editingMap[note._id]}
            currentUserName={user?.name}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </CardContent>
    </Card>
  );
}

function areEqual(prev: Props, next: Props) {
  return (
    prev.note._id === next.note._id &&
    prev.note.title === next.note.title &&
    prev.note.content === next.note.content &&
    prev.note.updatedAt === next.note.updatedAt &&
    prev.note.updatedBy === next.note.updatedBy &&
    prev.note.createdBy === next.note.createdBy
  );
}

export default memo(NoteCard, areEqual);
