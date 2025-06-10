import { RequestHandler } from 'express';
import { signupUser, loginUser, getUserFromAccessToken, logoutUser } from '../services/authService';
import { ENV } from '../utils/envUtils';

export const signup: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await signupUser(name, email, password);

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed' });
  }
};

export const login: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await loginUser(email, password);

    res
      .cookie('token', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: ENV.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000, 
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: ENV.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      })
      .json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

export const getMe: RequestHandler = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const user = await getUserFromAccessToken(token);
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const logout: RequestHandler = async (req, res) => {
  await logoutUser(req.cookies.refreshToken);

  res
    .clearCookie('token')
    .clearCookie('refreshToken')
    .json({ message: 'Logged out' });
};
