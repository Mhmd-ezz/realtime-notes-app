import type { Server } from 'socket.io';
import type { NoteType } from './models/Note';

let io: Server;

export const initSocket = (serverIO: Server) => {
  io = serverIO;

  io.on('connection', (socket) => {
    console.log('🟢 Socket connected:', socket.id);

    socket.on('note:update', (note: NoteType) => {
      io.emit('note:update', note);
    });

    socket.on('note:delete', (noteId: string) => {
      io.emit('note:delete', noteId);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Socket disconnected:', socket.id);
    });

    socket.on('note:editing', ({ noteId, user }) => {
      socket.join(noteId);
      socket.broadcast.emit('note:editing', { noteId, user });
    });

    socket.on('note:stop-editing', ({ noteId }) => {
      socket.broadcast.emit('note:stop-editing', { noteId });
    });

    socket.on('note:typing', ({ noteId, user }) => {
      console.log('[backend] note:typing received', { noteId, user });

      socket.join(noteId);

      socket.to(noteId).emit('note:user-typing', { noteId, user });
    });
    
  });
};

export const getIO = (): Server => {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
};
