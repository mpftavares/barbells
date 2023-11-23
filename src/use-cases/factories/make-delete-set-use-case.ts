import { PrismaSetsRepository } from '@/repositories/prisma/prisma-sets-repository'
import { DeleteSetUseCase } from '../sets/delete'

export function makeDeleteSetUseCase() {
  const setsRepository = new PrismaSetsRepository()
  const deleteSetUseCase = new DeleteSetUseCase(setsRepository)

  return deleteSetUseCase
}
