import { PrismaWorkoutsRepository } from "@/repositories/prisma/prisma-workouts-repository"
import { SearchWorkoutsByDateUseCase } from "@/use-cases/workouts/search-by-date"

export function makeSearchWorkoutsByDateUseCase() {
    const workoutsRepository = new PrismaWorkoutsRepository()
    const searchWorkoutsByDateUseCase = new SearchWorkoutsByDateUseCase(workoutsRepository)

    return searchWorkoutsByDateUseCase
}