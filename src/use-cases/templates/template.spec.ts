import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryTemplatesRepository } from '@/repositories/in-memory/in-memory-templates-repository'
import { GetTemplateUseCase } from './template'
import { randomUUID } from 'crypto'

let templatesRepository: InMemoryTemplatesRepository
let sut: GetTemplateUseCase

describe('Get Template Profile Use Case', () => {
    beforeEach(() => {
        templatesRepository = new InMemoryTemplatesRepository()
        sut = new GetTemplateUseCase(templatesRepository)
    })

    it('should be able to get a template by id', async () => {
        const createdTemplate = await templatesRepository.create({
            name: 'test template',
            userId: randomUUID(),
        })

        const { template } = await sut.execute({ templateId: createdTemplate.id })

        expect(template.name).toEqual('test template')
    })

    it('should not be able to get template profile with wrong id', async () => {
        await expect(() =>
            sut.execute({ templateId: 'non-existing-id' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
