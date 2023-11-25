import { PrismaSchemasRepository } from '@/repositories/prisma/prisma-schemas-repository'
import { GetSchemaUseCase } from '../../schemas/schema'

export function makeGetSchemaUseCase() {
    const schemasRepository = new PrismaSchemasRepository()
    const getSchemaUseCase = new GetSchemaUseCase(schemasRepository)

    return getSchemaUseCase
}
