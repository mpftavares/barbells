import { PrismaSchemasRepository } from "@/repositories/prisma/prisma-schemas-repository"
import { UpdateSchemaUseCase } from "../../schemas/update"

export function makeUpdateSchemaUseCase() {
    const schemasRepository = new PrismaSchemasRepository()
    const updateSchemaUseCase = new UpdateSchemaUseCase(schemasRepository)

    return updateSchemaUseCase
}
