import { PrismaExercisesRepository } from '@/repositories/prisma/prisma-exercises-repository'
import { DeleteExerciseUseCase } from '../exercises/delete'

export function makeDeleteExerciseUseCase() {
    const exercisesRepository = new PrismaExercisesRepository()
    const deleteExerciseUseCase = new DeleteExerciseUseCase(exercisesRepository)

    return deleteExerciseUseCase
}
