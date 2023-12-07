import { InMemorySchemasRepository } from '@/repositories/in-memory/in-memory-schemas-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateSchemaUseCase } from './create'

let schemasRepository: InMemorySchemasRepository
let sut: CreateSchemaUseCase

describe('Create Schema Use Case', () => {
  beforeEach(() => {
    schemasRepository = new InMemorySchemasRepository()
    sut = new CreateSchemaUseCase(schemasRepository)
  })

  it('should be able to create an schema', async () => {
    const { schema } = await sut.execute({
      templateId: "template-01",
      number: 1,
      exerciseId: "exercise-01",
      sets: 3,
      reps: '8-12'
    })

    expect(schema.id).toEqual(expect.any(String))
  })

})
