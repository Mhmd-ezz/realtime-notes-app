import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '../utils/jwtUtils';
import { storeSession, deleteSession } from './sessionStore';

export const getUserFromAccessToken = async (token: string) => {
  const decoded = verifyAccessToken(token);
  const user = await User.findById(decoded.userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

export const signupUser = async (name: string, email: string, password: string) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already exists');

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const accessToken = signAccessToken({ userId: user._id.toString(), name: user.name });
  const refreshToken = signRefreshToken({ userId: user._id.toString() });

  await storeSession(user._id.toString(), refreshToken);

  return { user, accessToken, refreshToken };
};

export const logoutUser = async (refreshToken?: string) => {
  if (!refreshToken) return;
  try {
    const decoded = verifyRefreshToken(refreshToken) as { userId: string };
    await deleteSession(decoded.userId);
  } catch {
    // fail silently
  }
};

