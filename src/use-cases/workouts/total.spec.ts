import { InMemoryWorkoutsRepository } from '@/repositories/in-memory/in-memory-workouts-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserWorkoutTotalUseCase } from './total'

let workoutsRepository: InMemoryWorkoutsRepository
let sut: UserWorkoutTotalUseCase

describe('User Workout Total Use Case', () => {
    beforeEach(async () => {
        workoutsRepository = new InMemoryWorkoutsRepository()
        sut = new UserWorkoutTotalUseCase(workoutsRepository)
    })

    it('should be able to count user workout total', async () => {
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

        const { count } = await sut.execute({
            userId: 'user-01',
        })

        expect(count).toEqual(2)
    })
})
