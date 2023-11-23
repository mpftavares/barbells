import { PrismaSetsRepository } from "@/repositories/prisma/prisma-sets-repository"
import { CreateSetUseCase } from "../sets/create"

export function makeCreateSetUseCase() {
    const setsRepository = new PrismaSetsRepository()
    const makeCreateSetsUseCase = new CreateSetUseCase(setsRepository)

    return makeCreateSetsUseCase
}