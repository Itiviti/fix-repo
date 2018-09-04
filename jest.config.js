module.exports = {
    verbose: true,
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "**/__tests__/*.+(ts|tsx|js)"
    ],
    moduleFileExtensions: [
        "ts",
        "js",
    ],
    collectCoverage: true,
};