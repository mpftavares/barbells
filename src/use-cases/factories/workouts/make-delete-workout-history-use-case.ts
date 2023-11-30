import { PrismaWorkoutsRepository } from "@/repositories/prisma/prisma-workouts-repository"
import { DeleteUserWorkoutsHistoryUseCase } from "@/use-cases/workouts/delete-history"

export function makeDeleteUserWorkoutsHistoryUseCase() {
    const workoutsRepository = new PrismaWorkoutsRepository()
    const deleteUserWorkoutsHistoryUseCase = new DeleteUserWorkoutsHistoryUseCase(workoutsRepository)

    return deleteUserWorkoutsHistoryUseCase
}
