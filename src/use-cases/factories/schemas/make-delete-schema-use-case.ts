import { PrismaSchemasRepository } from '@/repositories/prisma/prisma-schemas-repository'
import { DeleteSchemaUseCase } from '../../schemas/delete'

export function makeDeleteSchemaUseCase() {
    const schemasRepository = new PrismaSchemasRepository()
    const deleteSchemaUseCase = new DeleteSchemaUseCase(schemasRepository)

    return deleteSchemaUseCase
}
