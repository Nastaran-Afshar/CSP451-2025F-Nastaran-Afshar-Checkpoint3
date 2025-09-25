// jest.config.cjs
module.exports = {
  testEnvironment: 'node',
  // No transforms needed for plain JS when using --experimental-vm-modules
  transform: {},

  // Find .mjs or .js tests
  testMatch: ['**/*.test.mjs', '**/*.test.js'],

  // Coverage
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 },
  },
};
