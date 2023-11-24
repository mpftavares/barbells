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
    })

    expect(template.id).toEqual(expect.any(String))
  })

})
