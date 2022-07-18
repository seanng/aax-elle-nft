import { Prisma, Mint } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const create = async (
  input: Prisma.MintCreateInput
): Promise<Partial<Mint>> =>
  prisma.mint.create({
    data: Prisma.validator<Prisma.MintCreateInput>()(input),
  })

export const findAll = async (where: Prisma.MintWhereInput) =>
  prisma.mint.findMany({ where })