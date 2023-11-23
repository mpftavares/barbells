import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemorySetsRepository } from '@/repositories/in-memory/in-memory-sets-repository'
import { GetSetUseCase } from './set'

let setsRepository: InMemorySetsRepository
let sut: GetSetUseCase

describe('Get Set Profile Use Case', () => {
    beforeEach(() => {
        setsRepository = new InMemorySetsRepository()
        sut = new GetSetUseCase(setsRepository)
    })

    it('should be able to get a set by id', async () => {
        const createdSet = await setsRepository.create({
            workoutId: "workout-01",
            exerciseId: "exercise-01",
            weight: 100,
            reps: 10,
        })

        const { set } = await sut.execute({ setId: createdSet.id })

        expect(set.weight).toEqual(100)
        expect(set.reps).toEqual(10)
    })

    it('should not be able to get set profile with wrong id', async () => {
        await expect(() =>
            sut.execute({ setId: 'non-existing-id' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
