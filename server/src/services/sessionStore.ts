const sessions = new Map<string, string>(); 

// import Redis from 'ioredis';
// const redis = new Redis();

const useRedis = false; // set to true if Redis is available

export const storeSession = async (userId: string, refreshToken: string) => {
  if (useRedis) {
    // await redis.set(`session:${userId}`, refreshToken, 'EX', 7 * 24 * 60 * 60);
  } else {
    sessions.set(userId, refreshToken);
  }
};

export const getSession = async (userId: string): Promise<string | null> => {
  if (useRedis) {
    // return await redis.get(`session:${userId}`);
    return null;
  } else {
    return sessions.get(userId) || null;
  }
};

export const deleteSession = async (userId: string) => {
  if (useRedis) {
    // await redis.del(`session:${userId}`);
  } else {
    sessions.delete(userId);
  }
};
