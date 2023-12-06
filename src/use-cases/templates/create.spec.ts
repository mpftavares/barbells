import { InMemoryTemplatesRepository } from '@/repositories/in-memory/in-memory-templates-repository'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceAlreadyExistsError } from '../errors/item-already-exists-error'
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
          { exerciseId: 'exercise-01', sets: 3, reps: '8-12' },
          { exerciseId: 'exercise-02', sets: 3, reps: '8-12' },
          { exerciseId: 'exercise-03', sets: 3, reps: '8-12' }
        ]
      }
    })

    expect(template.id).toEqual(expect.any(String))
  })

  it('should not be able to create a template with the same name', async () => {

    await sut.execute({
      name: 'test template',
      userId: randomUUID(),
      schemas: {
        create: [
          { exerciseId: 'exercise-01', sets: 3, reps: '8-12' },
          { exerciseId: 'exercise-02', sets: 3, reps: '8-12' },
          { exerciseId: 'exercise-03', sets: 3, reps: '8-12' }
        ]
      }
    })

    await expect(() =>
      sut.execute({
        name: 'test template',
        userId: randomUUID(),
        schemas: {
          create: [
            { exerciseId: 'exercise-01', sets: 3, reps: '8-12' },
            { exerciseId: 'exercise-02', sets: 3, reps: '8-12' },
            { exerciseId: 'exercise-03', sets: 3, reps: '8-12' }
          ]
        }
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)

  })


})
