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
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80
        }
    }
};
