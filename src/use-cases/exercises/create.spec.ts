import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateExerciseUseCase } from './create'

let exercisesRepository: InMemoryExercisesRepository
let sut: CreateExerciseUseCase

describe('Create Exercise Use Case', () => {
  beforeEach(() => {
    exercisesRepository = new InMemoryExercisesRepository()
    sut = new CreateExerciseUseCase(exercisesRepository)
  })

  it('should be able to create an exercise', async () => {
    const { exercise } = await sut.execute({
      name: 'test exercise',
      equipment: 'dumbells',
      unilateral: true,
      userId: 'user-01'
    })

    expect(exercise.id).toEqual(expect.any(String))
  })

})
