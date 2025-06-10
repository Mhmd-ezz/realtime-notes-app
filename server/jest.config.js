import { createDefaultPreset } from 'ts-jest';

const preset = createDefaultPreset();

export default {
  ...preset,
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
};
