import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchExerciseByNamesUseCase } from './search-by-name'

let exercisesRepository: InMemoryExercisesRepository
let sut: SearchExerciseByNamesUseCase

describe('Search Exercises Use Case', () => {
    beforeEach(async () => {
        exercisesRepository = new InMemoryExercisesRepository()
        sut = new SearchExerciseByNamesUseCase(exercisesRepository)
    })

    it('should be able to search exercises by name', async () => {
        await exercisesRepository.create({
            name: 'test exercise',
            equipment: 'dumbbells',
            unilateral: true,
            userId: 'user-01',
            targets: {
                create: [
                    { muscle: 'legs' },
                    { muscle: 'glutes' },
                    { muscle: 'hamstrings' },
                ],
            },
        })

        await exercisesRepository.create({
            name: 'another test exercise',
            equipment: 'dumbbells',
            unilateral: true,
            userId: 'user-01',
            targets: {
                create: [
                    { muscle: 'legs' },
                    { muscle: 'glutes' },
                    { muscle: 'hamstrings' },
                ],
            },
        })

        const { exercises } = await sut.execute({
            query: 'another test'
        })

        expect(exercises).toHaveLength(1)
        expect(exercises).toEqual([expect.objectContaining({ name: 'another test exercise' })])
    })
})
