import { PrismaExercisesRepository } from '@/repositories/prisma/prisma-exercises-repository'
import { SearchExerciseByTargetuseCase } from '@/use-cases/exercises/search-by-target'


export function makeSearchExerciseUseCase() {
    const exercisesRepository = new PrismaExercisesRepository()
    const searchExerciseByTargetUseCase = new SearchExerciseByTargetuseCase(exercisesRepository)

    return searchExerciseByTargetUseCase
}
