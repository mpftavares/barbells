import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTemplatesRepository } from '@/repositories/in-memory/in-memory-templates-repository'
import { GetAllTemplatesUseCase } from './all-templates'
import { randomUUID } from 'crypto'

let templatesRepository: InMemoryTemplatesRepository
let sut: GetAllTemplatesUseCase

describe('Get All Templates Use Case', () => {
    beforeEach(() => {
        templatesRepository = new InMemoryTemplatesRepository()
        sut = new GetAllTemplatesUseCase(templatesRepository)
    })

    it('should be able to get all templates', async () => {

        const userId = randomUUID()

        await templatesRepository.create({
            name: 'test template',
            userId: userId,
        })

        await templatesRepository.create({
            name: 'test template',
            userId: null,
        })

        const { templates } = await sut.execute({ userId })

        expect(templates.length).toEqual(2)
    })

})
