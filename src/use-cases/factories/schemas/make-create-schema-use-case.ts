import { PrismaSchemasRepository } from "@/repositories/prisma/prisma-schemas-repository"
import { CreateSchemaUseCase } from "../../schemas/create"

export function makeCreateSchemaUseCase() {
    const schemasRepository = new PrismaSchemasRepository()
    const makeCreateSchemaUseCase = new CreateSchemaUseCase(schemasRepository)

    return makeCreateSchemaUseCase
}