import { PrismaExercisesRepository } from '@/repositories/prisma/prisma-exercises-repository'
import { GetAllExercisesUseCase } from '@/use-cases/exercises/all-exercises'

export function makeGetAllExercisesUseCase() {
    const exercisesRepository = new PrismaExercisesRepository()
    const getAllExercisesUseCase = new GetAllExercisesUseCase(exercisesRepository)

    return getAllExercisesUseCase
}
