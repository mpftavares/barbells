import { PrismaExercisesRepository } from "@/repositories/prisma/prisma-exercises-repository"
import { PrismaTargetsRepository } from "@/repositories/prisma/prisma-targets-repository"
import { CreateExerciseUseCase } from "../../exercises/create"

export function makeCreateExerciseUseCase() {
    const exercisesRepository = new PrismaExercisesRepository()
    const targetsRepository = new PrismaTargetsRepository()
    
    const makeCreateExercisesUseCase = new CreateExerciseUseCase(exercisesRepository, targetsRepository)

    return makeCreateExercisesUseCase
}