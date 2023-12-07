import { InMemorySetsRepository } from '@/repositories/in-memory/in-memory-sets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateSetUseCase } from './create'

let setsRepository: InMemorySetsRepository
let sut: CreateSetUseCase

describe('Create Set Use Case', () => {
    beforeEach(() => {
        setsRepository = new InMemorySetsRepository()
        sut = new CreateSetUseCase(setsRepository)
    })

    it('should be able to create a set', async () => {

        const { set } = await sut.execute({
            workoutId: "workout-01",
            number: 1,
            exerciseId: "exercise-01",
            weight: 100,
            reps: 10,
        })

        expect(set.id).toEqual(expect.any(String))
    })
})
