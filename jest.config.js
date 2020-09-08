module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
setupFilesAfterEnv: ['./jest.setup.js'],
moduleNameMapper: {
  "^@src/(.*)$": '<rootDir>/src/$1',
  "^@customTypes/(.*)$": '<rootDir>/customTypes/$1',
  "^@env/(.*)$": '<rootDir>/envs/$1',
}
};
