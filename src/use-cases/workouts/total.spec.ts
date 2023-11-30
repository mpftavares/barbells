import { InMemoryWorkoutsRepository } from '@/repositories/in-memory/in-memory-workouts-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserWorkoutTotalUseCase } from './total'

let workoutsRepository: InMemoryWorkoutsRepository
let sut: UserWorkoutTotalUseCase

describe('Fetch User Check-in History Use Case', () => {
    beforeEach(async () => {
        workoutsRepository = new InMemoryWorkoutsRepository()
        sut = new UserWorkoutTotalUseCase(workoutsRepository)
    })

    it('should be able to fetch check-in history', async () => {
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

        expect(count).toHaveLength(2)
        expect(count).toEqual([
            expect.objectContaining({ name: 'test workout' }),
            expect.objectContaining({ name: 'another test workout' }),
        ])
    })
})
