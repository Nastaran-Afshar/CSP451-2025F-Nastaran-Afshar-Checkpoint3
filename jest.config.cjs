// jest.config.cjs
module.exports = {
  testEnvironment: "node",

  // 👇 tell Jest to treat .js as ESM (since package.json has "type": "module")
  extensionsToTreatAsEsm: [".js"],
  transform: {}, // no Babel needed for plain JS

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary", "lcov"],
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 }
  },

  // (optional) limit to your source files
  collectCoverageFrom: ["src/**/*.js"]
};
