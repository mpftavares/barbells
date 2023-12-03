import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { GetAllExercisesUseCase } from './all-exercises'
import { randomUUID } from 'crypto'

let exercisesRepository: InMemoryExercisesRepository
let sut: GetAllExercisesUseCase

describe('Get All Exercises Use Case', () => {
    beforeEach(() => {
        exercisesRepository = new InMemoryExercisesRepository()
        sut = new GetAllExercisesUseCase(exercisesRepository)
    })

    it('should be able to get all exercises', async () => {

        const userId = randomUUID()

        await exercisesRepository.create({
            name: 'test exercise',
            equipment: 'dumbbells',
            unilateral: true,
            userId: userId,
            targets: {
                create: [
                    { muscle: 'glutes' },
                    { muscle: 'hamstrings' },
                ],
            },
        })

        await exercisesRepository.create({
            name: 'test exercise',
            equipment: 'barbell',
            unilateral: false,
            userId: null,
            targets: {
                create: [
                    { muscle: 'glutes' },
                    { muscle: 'hamstrings' },
                ],
            },
        })

        const { exercises } = await sut.execute({ userId })

        expect(exercises.length).toEqual(2)
    })

})
