import { InMemoryTemplatesRepository } from '@/repositories/in-memory/in-memory-templates-repository'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTemplateUseCase } from './create'

let templatesRepository: InMemoryTemplatesRepository
let sut: CreateTemplateUseCase

describe('Create Template Use Case', () => {
  beforeEach(() => {
    templatesRepository = new InMemoryTemplatesRepository()
    sut = new CreateTemplateUseCase(templatesRepository)
  })

  it('should be able to create a template', async () => {
    const { template } = await sut.execute({
      name: 'test template',
      userId: randomUUID(),
      schemas: {
        create: [
          { exerciseId: 'exercise-01', number: 1, sets: 3, reps: '8-12' },
          { exerciseId: 'exercise-02', number: 2, sets: 3, reps: '8-12' },
          { exerciseId: 'exercise-03', number: 3, sets: 3, reps: '8-12' }
        ]
      }
    })

    expect(template.id).toEqual(expect.any(String))
  })

})
