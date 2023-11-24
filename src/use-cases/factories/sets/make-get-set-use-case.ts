import { PrismaSetsRepository } from '@/repositories/prisma/prisma-sets-repository'
import { GetSetUseCase } from '../../sets/set'

export function makeGetSetUseCase() {
  const setsRepository = new PrismaSetsRepository()
  const getSetUseCase = new GetSetUseCase(setsRepository)

  return getSetUseCase
}
