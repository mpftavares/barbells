import { PrismaWorkoutsRepository } from "@/repositories/prisma/prisma-workouts-repository"
import { UserWorkoutsHistoryUseCase } from "@/use-cases/workouts/history"

export function makeUserWorkoutsHistoryUseCase() {
    const workoutsRepository = new PrismaWorkoutsRepository()
    const userWorkoutsHistoryUseCase = new UserWorkoutsHistoryUseCase(workoutsRepository)

    return userWorkoutsHistoryUseCase
}
