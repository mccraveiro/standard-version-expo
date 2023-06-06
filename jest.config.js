module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: {
          allowJs: true,
        },
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(detect-indent|detect-newline))'],
};
