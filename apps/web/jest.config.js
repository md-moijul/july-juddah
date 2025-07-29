module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\.(ts|tsx|js|jsx)$' : ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'] }],
  },
  moduleNameMapper: {
    '^@/components/ui/(.*)$' : '<rootDir>/components/ui/$1',
    '^@/components/(.*)$' : '<rootDir>/src/components/$1',
    '^@/(.*)$' : '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@radix-ui)/)',
  ],
};