import { PrismaWorkoutsRepository } from "@/repositories/prisma/prisma-workouts-repository"
import { UserWorkoutTotalUseCase } from "@/use-cases/workouts/total"

export function makeUserWorkoutTotalUseCase() {
  const workoutsRepository = new PrismaWorkoutsRepository()
  const userWorkoutTotalUseCase = new UserWorkoutTotalUseCase(workoutsRepository)

  return userWorkoutTotalUseCase
}
