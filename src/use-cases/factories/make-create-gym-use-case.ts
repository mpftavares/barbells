import { PrismaWorkoutsRepository } from "@/repositories/prisma/prisma-workouts-repository"
import { CreateWorkoutUseCase } from "../workouts/create"

export function makeCreateWorkoutUseCase() {
    const workoutsRepository = new PrismaWorkoutsRepository()
    const makeWorkoutsUseCase = new CreateWorkoutUseCase(workoutsRepository)

    return makeWorkoutsUseCase
}