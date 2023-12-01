import { PrismaWorkoutsRepository } from "@/repositories/prisma/prisma-workouts-repository"
import { SearchUserWorkoutDateUseCase } from "@/use-cases/workouts/date-search"

export function makeSearchUserWorkoutDateUseCase() {
    const workoutsRepository = new PrismaWorkoutsRepository()
    const searchUserWorkoutDateUseCase = new SearchUserWorkoutDateUseCase(workoutsRepository)

    return searchUserWorkoutDateUseCase
}