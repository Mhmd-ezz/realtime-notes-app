import { Request } from 'express';
import { verifyAccessToken, JwtAccessPayload } from './jwtUtils';

export const getUserFromRequest = (req: Request): JwtAccessPayload | null => {
  const token = req.cookies?.token;
  if (!token) return null;

  try {
    const user = verifyAccessToken(token);
    if (!user.name) return null;
    return user;
  } catch {
    return null;
  }
};
