// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  })

// export const prisma =
//   process.env.NODE_ENV === 'test'
//     ? mockDeep<PrismaClient>()
//     : global.prisma ||
//       new PrismaClient({
//         log: ['query'],
//       })

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test')
  global.prisma = prisma
