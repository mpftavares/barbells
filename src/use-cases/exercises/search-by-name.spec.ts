import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchExerciseByNameUseCase } from './search-by-name'

let exercisesRepository: InMemoryExercisesRepository
let sut: SearchExerciseByNameUseCase

describe('Search Exercises Use Case', () => {
    beforeEach(async () => {
        exercisesRepository = new InMemoryExercisesRepository()
        sut = new SearchExerciseByNameUseCase(exercisesRepository)
    })

    it('should be able to search exercises by name', async () => {
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

        const { exercises } = await sut.execute({
            userId: 'user-01',
            query: 'test'
        })

        expect(exercises).toHaveLength(2)
    })

    it('should not be able to search other users exercises by name', async () => {
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
            name: 'test exercise',
            equipment: 'dumbbells',
            unilateral: true,
            userId: 'user-02',
            targets: {
                create: [
                    { muscle: 'glutes' },
                    { muscle: 'hamstrings' },
                ],
            },
        })

        const { exercises } = await sut.execute({
            userId: 'user-01',
            query: 'test'
        })

        expect(exercises).toHaveLength(1)
    })
})
