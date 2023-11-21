import { InMemoryWorkoutsRepository } from '@/repositories/in-memory/in-memory-workouts-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateWorkoutUseCase } from './create'

let workoutsRepository: InMemoryWorkoutsRepository
let sut: CreateWorkoutUseCase

describe('Create Workout Use Case', () => {
  beforeEach(() => {
    workoutsRepository = new InMemoryWorkoutsRepository()
    sut = new CreateWorkoutUseCase(workoutsRepository)
  })

  it('should be able to create a workout not providing a timestamp input', async () => {
    const { workout } = await sut.execute({
      name: 'test workout',
      timestamp: undefined,
      userId: 'user-01'
    })

    expect(workout.timestamp).toEqual(expect.any(Date))
  })

  it('should be able to create a workout providing a timestamp input', async () => {
    const { workout } = await sut.execute({
      name: 'test workout',
      timestamp: new Date().toISOString(),
      userId: 'user-01'
    })

    expect(workout.timestamp).toEqual(expect.any(Date))
  })
})
