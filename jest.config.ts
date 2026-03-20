import type { Config } from 'jest';
import nextJest from 'next/jest.js';

// We have to indicate where's the root path
const createJestConfig = nextJest({
  dir: './',
});

// Config
const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  // ! Important to use jsdom to simulate
  testEnvironment: 'jest-environment-jsdom',

  // Link to our jest.setup.ts
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
