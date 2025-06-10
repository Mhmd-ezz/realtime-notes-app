import jwt from 'jsonwebtoken';
import { ENV } from './envUtils';

export interface JwtAccessPayload {
  userId: string;
  name?: string;
}

export interface JwtRefreshPayload {
  userId: string;
}

export const signAccessToken = (payload: JwtAccessPayload): string =>
  jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '15m' });

export const signRefreshToken = (payload: JwtRefreshPayload): string =>
  jwt.sign(payload, ENV.REFRESH_SECRET, { expiresIn: '7d' });

export const verifyAccessToken = (token: string): JwtAccessPayload => {
  return jwt.verify(token, ENV.JWT_SECRET) as JwtAccessPayload;
};

export const verifyRefreshToken = (token: string): JwtRefreshPayload => {
  return jwt.verify(token, ENV.REFRESH_SECRET) as JwtRefreshPayload;
};
