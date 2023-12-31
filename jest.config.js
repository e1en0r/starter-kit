const { defaults } = require('jest-config');

module.exports = {
  verbose: false,
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!lodash-es).+\\.js$'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/__tests__/tsconfig.json',
      diagnostics: true,
    },
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  modulePathIgnorePatterns: [...defaults.modulePathIgnorePatterns, 'lib/package.json'],
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, '.d.ts$'],
  testMatch: ['**/__tests__/**/*.(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^assets(.*)$': '<rootDir>/src/assets$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^config(.*)$': '<rootDir>/src/config$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^icons(.*)$': '<rootDir>/src/icons$1',
    '^modals(.*)$': '<rootDir>/src/modals$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^postcss(.*)$': '<rootDir>/src/postcss$1',
    '^styles(.*)$': '<rootDir>/src/styles$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '\\.css$': '<rootDir>/__tests__/mocks/style.mock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests/mocks/file.mock.js',
  },
  setupFiles: ['<rootDir>/.jestenv.js'],
};
