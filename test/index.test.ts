/**
 * 对于测试单元文件，一律以 .test.ts 为后缀并且放在 test 目录下
 */

import { add } from '@/index.ts';
import { multiply } from '@/utils/math.ts';

describe('add', () => {
    it('should return the sum of two numbers', () => {
        expect(add(2, 3)).toBe(5);
        expect(add(-1, 5)).toBe(4);
        expect(add(0, 0)).toBe(0);
    });
});

describe('multiply', () => {
    it('should return the product of two numbers', () => {
        expect(multiply(2, 3)).toBe(6);
        expect(multiply(-1, 5)).toBe(-5);
        expect(multiply(0, 0)).toBe(0);
    });
});