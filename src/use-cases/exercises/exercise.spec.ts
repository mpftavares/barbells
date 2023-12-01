import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { GetExerciseUseCase } from './exercise'

let exercisesRepository: InMemoryExercisesRepository
let sut: GetExerciseUseCase

describe('Get Exercise Use Case', () => {
    beforeEach(() => {
        exercisesRepository = new InMemoryExercisesRepository()
        sut = new GetExerciseUseCase(exercisesRepository)
    })

    it('should be able to get an exercise by id', async () => {
        const createdExercise = await exercisesRepository.create({
            name: 'test exercise',
            equipment: 'dumbbells',
            unilateral: true,
            userId: 'user-01',
            targets: {
                create: [
                    { muscle: 'glutes' },
                    { muscle: 'hamstrings' },
                ],
            },
        })

        const { exercise } = await sut.execute({ exerciseId: createdExercise.id })

        expect(exercise.name).toEqual('test exercise')
    })

    it('should not be able to get exercise with wrong id', async () => {
        await expect(() =>
            sut.execute({ exerciseId: 'non-existing-id' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
