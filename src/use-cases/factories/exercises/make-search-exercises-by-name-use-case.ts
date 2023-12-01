import { PrismaExercisesRepository } from '@/repositories/prisma/prisma-exercises-repository'
import { SearchExerciseByNameUseCase } from '@/use-cases/exercises/search-by-name'


export function makeSearchExerciseUseCase() {
    const exercisesRepository = new PrismaExercisesRepository()
    const searchExerciseByNameUseCase = new SearchExerciseByNameUseCase(exercisesRepository)

    return searchExerciseByNameUseCase
}
