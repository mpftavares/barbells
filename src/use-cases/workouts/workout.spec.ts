import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryWorkoutsRepository } from '@/repositories/in-memory/in-memory-workouts-repository'
import { GetWorkoutUseCase } from './workout'

let workoutsRepository: InMemoryWorkoutsRepository
let sut: GetWorkoutUseCase

describe('Get Workout Profile Use Case', () => {
    beforeEach(() => {
        workoutsRepository = new InMemoryWorkoutsRepository()
        sut = new GetWorkoutUseCase(workoutsRepository)
    })

    it('should be able to get a workout by id', async () => {
        const createdWorkout = await workoutsRepository.create({
            name: 'test workout',
            timestamp: new Date().toISOString(),
            userId: 'user-01'
        })

        const { workout } = await sut.execute({ workoutId: createdWorkout.id })

        expect(workout.name).toEqual('test workout')
    })

    it('should not be able to get workout profile with wrong id', async () => {
        await expect(() =>
            sut.execute({ workoutId: 'non-existing-id' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
