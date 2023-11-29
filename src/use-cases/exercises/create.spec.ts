import { prisma } from '@/lib/prisma'
import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { InMemoryTargetsRepository } from '@/repositories/in-memory/in-memory-targets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateExerciseUseCase } from './create'

let exercisesRepository: InMemoryExercisesRepository
let targetsRepository = new InMemoryTargetsRepository
let sut: CreateExerciseUseCase

describe('Create Exercise Use Case', () => {
  beforeEach(() => {
    exercisesRepository = new InMemoryExercisesRepository()
    targetsRepository = new InMemoryTargetsRepository()
    sut = new CreateExerciseUseCase(exercisesRepository, targetsRepository)
  })

  it('should be able to create an exercise with muscle targets', async () => {
    const { exercise } = await sut.execute({
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

    expect(exercise.id).toEqual(expect.any(String))

    const targets = await targetsRepository.findByExercise(exercise.id)
    expect(targets.length).toEqual(3)
  })

})
