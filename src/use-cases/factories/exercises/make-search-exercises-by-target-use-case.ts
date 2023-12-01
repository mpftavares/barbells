import { PrismaExercisesRepository } from '@/repositories/prisma/prisma-exercises-repository'
import { SearchExerciseByTargetsUseCase } from '@/use-cases/exercises/search-by-target'


export function makeSearchExerciseUseCase() {
    const exercisesRepository = new PrismaExercisesRepository()
    const searchExerciseByTargetUseCase = new SearchExerciseByTargetsUseCase(exercisesRepository)

    return searchExerciseByTargetUseCase
}
