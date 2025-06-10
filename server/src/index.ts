import dotenv from 'dotenv';
dotenv.config();

import { ENV } from './utils/envUtils';
import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { connectDB } from './config/db';
import { initSocket } from './socket';

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.DEV_ORIGIN, ENV.PREVIEW_ORIGIN],
    credentials: true,
  },
});

initSocket(io);

server.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
