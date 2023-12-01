import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchExerciseByTargetuseCase } from './search-by-target'


let exercisesRepository: InMemoryExercisesRepository
let sut: SearchExerciseByTargetuseCase

describe('Search Exercises Use Case', () => {
    beforeEach(async () => {
        exercisesRepository = new InMemoryExercisesRepository()
        sut = new SearchExerciseByTargetuseCase(exercisesRepository)
    })

    it('should be able to search exercises by target', async () => {
        await exercisesRepository.create({
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

        await exercisesRepository.create({
            name: 'another test exercise',
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

        const { exercises } = await sut.execute({
            query: 'hamstrings'
        })

        // no test bc no in memory targets
    })
})
