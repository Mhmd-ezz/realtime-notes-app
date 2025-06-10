import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthenticatedRequest } from '../types/auth';
import { ENV } from '../utils/envUtils';
import { verifyAccessToken } from '../utils/jwtUtils';

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized - no token' });
    return;
  }

  try {
    const decoded = verifyAccessToken(token);
    (req as AuthenticatedRequest).user = { id: decoded.userId };
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized - invalid token' });
  }
};
