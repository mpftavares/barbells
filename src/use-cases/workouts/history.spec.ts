import { InMemoryWorkoutsRepository } from '@/repositories/in-memory/in-memory-workouts-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserWorkoutsHistoryUseCase } from './history'


let workoutsRepository: InMemoryWorkoutsRepository
let sut: FetchUserWorkoutsHistoryUseCase

describe('User Workout History Use Case', () => {
    beforeEach(async () => {
        workoutsRepository = new InMemoryWorkoutsRepository()
        sut = new FetchUserWorkoutsHistoryUseCase(workoutsRepository)
    })

    it('should be able to fetch user workout history', async () => {
        await workoutsRepository.create({
            name: 'test workout',
            timestamp: undefined,
            userId: 'user-01'
        })

        await workoutsRepository.create({
            name: 'another test workout',
            timestamp: undefined,
            userId: 'user-01'
        })

        const { workouts } = await sut.execute({
            userId: 'user-01',
        })

        expect(workouts).toHaveLength(2)
        expect(workouts).toEqual([
            expect.objectContaining({ name: 'test workout' }),
            expect.objectContaining({ name: 'another test workout' }),
        ])
    })
})
