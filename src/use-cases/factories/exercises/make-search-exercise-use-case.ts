import { PrismaExercisesRepository } from '@/repositories/prisma/prisma-exercises-repository'
import { SearchExercisesUseCase } from '@/use-cases/exercises/search'


export function makeSearchExerciseUseCase() {
    const exercisesRepository = new PrismaExercisesRepository()
    const searchExerciseUseCase = new SearchExercisesUseCase(exercisesRepository)

    return searchExerciseUseCase
}
