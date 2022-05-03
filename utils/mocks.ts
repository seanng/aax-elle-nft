import { PrismaClient } from '@prisma/client'
import { mockDeep } from 'jest-mock-extended'

export const createPrismaMock = (): PrismaClient => mockDeep<PrismaClient>()
