import { PrismaExercisesRepository } from "@/repositories/prisma/prisma-exercises-repository"
import { CreateExerciseUseCase } from "../../exercises/create"

export function makeCreateExerciseUseCase() {
    const exercisesRepository = new PrismaExercisesRepository()

    const makeCreateExercisesUseCase = new CreateExerciseUseCase(exercisesRepository)

    return makeCreateExercisesUseCase
}