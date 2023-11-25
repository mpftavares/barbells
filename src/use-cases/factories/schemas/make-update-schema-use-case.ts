import { PrismaSchemasRepository } from "@/repositories/prisma/prisma-schemas-repository"
import { UpdateSchemaUseCase } from "../../schemas/update"

export function makeUpdateSchemaUseCase() {
    const usersRepository = new PrismaSchemasRepository()
    const updateSchemaUseCase = new UpdateSchemaUseCase(usersRepository)

    return updateSchemaUseCase
}
