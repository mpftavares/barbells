import { PrismaExercisesRepository } from '@/repositories/prisma/prisma-exercises-repository'
import { GetExerciseUseCase } from '../exercises/exercise'

export function makeGetExerciseUseCase() {
    const exercisesRepository = new PrismaExercisesRepository()
    const getExerciseUseCase = new GetExerciseUseCase(exercisesRepository)

    return getExerciseUseCase
}
