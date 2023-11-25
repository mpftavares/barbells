import { PrismaSchemasRepository } from "@/repositories/prisma/prisma-schemas-repository"
import { CreateSchemaUseCase } from "../../schemas/create"

export function makeCreateSchemaUseCase() {
    const schemasRepository = new PrismaSchemasRepository()
    const makeCreateSchemasUseCase = new CreateSchemaUseCase(schemasRepository)

    return makeCreateSchemasUseCase
}