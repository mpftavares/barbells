import { PrismaWorkoutsRepository } from "@/repositories/prisma/prisma-workouts-repository"
import { UpdateWorkoutUseCase } from "../../workouts/update"

export function makeUpdateWorkoutUseCase() {
  const usersRepository = new PrismaWorkoutsRepository()
  const updateWorkoutUseCase = new UpdateWorkoutUseCase(usersRepository)

  return updateWorkoutUseCase
}
