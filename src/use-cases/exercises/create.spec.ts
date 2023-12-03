import { InMemoryExercisesRepository } from '@/repositories/in-memory/in-memory-exercises-repository'
import { InMemoryTargetsRepository } from '@/repositories/in-memory/in-memory-targets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceAlreadyExistsError } from '../errors/item-already-exists-error'
import { CreateExerciseUseCase } from './create'

let exercisesRepository: InMemoryExercisesRepository
let targetsRepository = new InMemoryTargetsRepository
let sut: CreateExerciseUseCase

describe('Create Exercise Use Case', () => {
  beforeEach(() => {
    exercisesRepository = new InMemoryExercisesRepository()
    targetsRepository = new InMemoryTargetsRepository()
    sut = new CreateExerciseUseCase(exercisesRepository)
  })

  it('should be able to create an exercise', async () => {
    const { exercise } = await sut.execute({
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

    expect(exercise.id).toEqual(expect.any(String))

  })

  it('should not be able to create an exercise with same name, equipment and unilateral value', async () => {

    await sut.execute({
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

    await expect(() =>
      sut.execute({
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
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError)

  })

})
