module.exports = {
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    collectCoverageFrom: [
      "src/**.{js,jsx}",
      "src/components/**",
      "src/constants/**",
      "src/redux/**",
      "!src/index.js",
      "!src/setupTests.js",
      "!src/serviceWorker.js"
    ]
  };