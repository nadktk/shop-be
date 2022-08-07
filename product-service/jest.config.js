module.exports = {
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/'],
    testRegex: '(/__tests__/.*\\.test)\\.js$',
    moduleFileExtensions: ['js', 'json', 'es6'],
    collectCoverageFrom: ['handlers/**/*.js', 'services/**/*.js'],
    coveragePathIgnorePatterns: ['/__tests__/'],
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'json', 'text'],
    modulePathIgnorePatterns: ['node_modules'],
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
        },
    },
};
