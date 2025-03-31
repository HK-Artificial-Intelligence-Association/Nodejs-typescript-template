import { multiply } from "@/utils/math.ts"

export function add(a: number, b: number) {
  return a + b
}

const a = 1

export const PrintedObject = {
  number:1,
  object:{
    error:new Error('error'),
    next:'sdhjkashd',
    datePrintedFormat:new Date()
  },
  array:[
    {
      a:1,
      b:2
    }
  ]
}

console.log('Hello world')
console.log('1+3 =', add(1,3))
console.log('1x2 =',multiply(1,2))