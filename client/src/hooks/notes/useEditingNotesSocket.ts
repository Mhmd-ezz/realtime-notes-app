import socket from "@/services/socket";
import { useEffect, useState } from "react";

export const useEditingNotesSocket = () => {
  const [editingMap, setEditingMap] = useState<Record<string, string>>({});

  useEffect(() => {
    socket.on('note:editing', ({ noteId, user }) => {
      setEditingMap((prev) => ({ ...prev, [noteId]: user }));
    });

    socket.on('note:stop-editing', ({ noteId }) => {
      setEditingMap((prev) => {
        const updated = { ...prev };
        delete updated[noteId];
        return updated;
      });
    });

    socket.on('note:user-typing', ({ noteId, user }) => {

      setEditingMap((prev) => ({ ...prev, [noteId]: user }));

      setTimeout(() => {
        setEditingMap((prev) => {
          if (prev[noteId] === user) {
            const updated = { ...prev };
            delete updated[noteId];
            return updated;
          }
          return prev;
        });
      }, 3000);
    });

    return () => {
      socket.off('note:editing');
      socket.off('note:stop-editing');
      socket.off('note:user-typing');
    };
  }, []);

  return editingMap;
};
