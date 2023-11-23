import { PrismaSetsRepository } from "@/repositories/prisma/prisma-sets-repository"
import { UpdateSetUseCase } from "../sets/update"

export function makeUpdateSetUseCase() {
  const usersRepository = new PrismaSetsRepository()
  const updateSetUseCase = new UpdateSetUseCase(usersRepository)

  return updateSetUseCase
}
