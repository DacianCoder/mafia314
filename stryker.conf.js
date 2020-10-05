/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  mutate: [
    'src/**/*.ts?(x)',
    '!src/api/**/*',
    '!src/**/*@(.test|.spec|Spec).ts?(x)',
  ],
  maxConcurrentTestRunners: 8, // Math.min(providedValue, cpuThreads)
  thresholds: { high: 80, low: 60, break: null },
  mutator: 'typescript',
  testRunner: 'jest',
  reporters: ['progress', 'clear-text', 'html'],
  coverageAnalysis: 'off',
  jest: {
    projectType: 'create-react-app',
  },
}
