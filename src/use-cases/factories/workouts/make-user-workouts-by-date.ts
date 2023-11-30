import { PrismaWorkoutsRepository } from "@/repositories/prisma/prisma-workouts-repository"
import { UserWorkoutsByDateUseCase } from "@/use-cases/workouts/date-search"

export function makeUserWorkoutsByDateUseCase() {
    const workoutsRepository = new PrismaWorkoutsRepository()
    const userWorkoutsByDateUseCase = new UserWorkoutsByDateUseCase(workoutsRepository)

    return userWorkoutsByDateUseCase
}