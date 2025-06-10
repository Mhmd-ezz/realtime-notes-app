import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import { ENV } from './utils/envUtils';

const app = express();
const allowedOrigins = [ENV.DEV_ORIGIN, ENV.PREVIEW_ORIGIN];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

export default app;
