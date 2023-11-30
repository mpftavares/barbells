import { PrismaWorkoutsRepository } from "@/repositories/prisma/prisma-workouts-repository"
import { FetchUserWorkoutsHistoryUseCase } from "@/use-cases/workouts/history"

export function makeFetchUserWorkoutsHistoryUseCase() {
    const workoutsRepository = new PrismaWorkoutsRepository()
    const fetchUserWorkoutsHistoryUseCase = new FetchUserWorkoutsHistoryUseCase(workoutsRepository)

    return fetchUserWorkoutsHistoryUseCase
}
