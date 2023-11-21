import { PrismaWorkoutsRepository } from "@/repositories/prisma/prisma-workouts-repository"
import { DeleteWorkoutUseCase } from "../workouts/delete"

export function makeDeleteWorkoutUseCase() {
    const usersRepository = new PrismaWorkoutsRepository()
    const deleteWorkoutUseCase = new DeleteWorkoutUseCase(usersRepository)

    return deleteWorkoutUseCase
}