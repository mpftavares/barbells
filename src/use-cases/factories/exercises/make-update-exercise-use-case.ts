import { PrismaExercisesRepository } from "@/repositories/prisma/prisma-exercises-repository"
import { UpdateExerciseUseCase } from "../../exercises/update"

export function makeUpdateExerciseUseCase() {
    const usersRepository = new PrismaExercisesRepository()
    const updateExerciseUseCase = new UpdateExerciseUseCase(usersRepository)

    return updateExerciseUseCase
}
