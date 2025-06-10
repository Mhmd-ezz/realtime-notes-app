import dotenv from 'dotenv';
dotenv.config();

function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const ENV = {
  PORT: parseInt(getEnvVar('PORT', '5000'), 10),
  MONGO_URI: getEnvVar('MONGO_URI'),
  JWT_SECRET: getEnvVar('JWT_SECRET'),
  REFRESH_SECRET: getEnvVar('REFRESH_SECRET'),
  DEV_ORIGIN: getEnvVar('DEV_ORIGIN'),
  PREVIEW_ORIGIN: getEnvVar('PREVIEW_ORIGIN'),
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
};
