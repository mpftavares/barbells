import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemorySchemasRepository } from '@/repositories/in-memory/in-memory-schemas-repository'
import { GetSchemaUseCase } from './schema'

let schemasRepository: InMemorySchemasRepository
let sut: GetSchemaUseCase

describe('Get Schema Profile Use Case', () => {
    beforeEach(() => {
        schemasRepository = new InMemorySchemasRepository()
        sut = new GetSchemaUseCase(schemasRepository)
    })

    it('should be able to get a schema by id', async () => {
        const createdSchema = await schemasRepository.create({
            templateId: "template-01",
            exerciseId: "exercise-01",
            number: 1,
            sets: 3,
            reps: '8-12'
        })

        const { schema } = await sut.execute({ schemaId: createdSchema.id })

        expect(schema.reps).toEqual('8-12')
    })

    it('should not be able to get schema profile with wrong id', async () => {
        await expect(() =>
            sut.execute({ schemaId: 'non-existing-id' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
