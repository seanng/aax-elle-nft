import { Prisma, SecretMessage } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const create = async (
  input: Prisma.SecretMessageCreateInput
): Promise<Partial<SecretMessage>> =>
  prisma.secretMessage.create({
    data: Prisma.validator<Prisma.SecretMessageCreateInput>()(input),
  })

export const findAll = async (where: Prisma.SecretMessageWhereInput) =>
  prisma.secretMessage.findMany({ where })
