import { RequestHandler } from 'express';
import { verifyRefreshToken, signAccessToken } from '../utils/jwtUtils';
import User from '../models/User';
import { getSession } from '../services/sessionStore';
import { ENV } from '../utils/envUtils';

export const refreshToken: RequestHandler = async (req, res): Promise<void> => {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.status(401).json({ message: 'No refresh token' });
    return;
  }

  try {
    const decoded = verifyRefreshToken(token);

    const storedToken = await getSession(decoded.userId);
    if (!storedToken || storedToken !== token) {
      res.status(403).json({ message: 'Token mismatch or expired' });
      return;
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const accessToken = signAccessToken({ userId: user._id.toString(), name: user.name });

    res
      .cookie('token', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: ENV.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000,
      })
      .json({ message: 'Access token refreshed' });
  } catch (err) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};
