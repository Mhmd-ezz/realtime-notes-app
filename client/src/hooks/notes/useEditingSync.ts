import { useEffect } from 'react';
import socket from '@/services/socket';
import { useEditingContext } from './useEditingContext';

export const useEditingSync = () => {
  const { setEditingMap } = useEditingContext();

  useEffect(() => {
    socket.on('note:editing', ({ noteId, user }) => {
      setEditingMap(prev => ({ ...prev, [noteId]: user }));
    });

    socket.on('note:stop-editing', ({ noteId }) => {
      setEditingMap(prev => {
        const updated = { ...prev };
        delete updated[noteId];
        return updated;
      });
    });

    return () => {
      socket.off('note:editing');
      socket.off('note:stop-editing');
    };
  }, [setEditingMap]);
};
