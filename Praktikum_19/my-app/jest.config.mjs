// jest.config.mjs
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.module\\.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(jose|next-auth|openid-client|uuid|@?firebase|firebase|swr|lodash-es|uuid))',
  ],
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
      },
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/jest.config.mjs',
    '!**/next.config.mjs',
    '!**/types/**',
    '!**/views/**',
    '!**/pages/api/**',
    '!**/*.d.ts',
  ],
}

export default createJestConfig(config)