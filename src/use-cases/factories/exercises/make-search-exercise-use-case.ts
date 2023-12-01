import { PrismaExercisesRepository } from '@/repositories/prisma/prisma-exercises-repository'
import { SearchExerciseByNamesUseCase } from '@/use-cases/exercises/search-by-name'


export function makeSearchExerciseUseCase() {
    const exercisesRepository = new PrismaExercisesRepository()
    const SearchExerciseByNameUseCase = new SearchExerciseByNamesUseCase(exercisesRepository)

    return SearchExerciseByNameUseCase
}
