import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    // 似乎 useESM 才是能够确保 transform 使用 ESM 模块的关键。
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { global: { tsconfig: 'tsconfig.json' },supportsStaticESM:true,useESM:true}],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['<rootDir>/test/**/*.test.ts'],
};

export default config;