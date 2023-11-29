import { PrismaSetsRepository } from "@/repositories/prisma/prisma-sets-repository"
import { UpdateSetUseCase } from "../../sets/update"

export function makeUpdateSetUseCase() {
  const setsRepository = new PrismaSetsRepository()
  const updateSetUseCase = new UpdateSetUseCase(setsRepository)

  return updateSetUseCase
}
