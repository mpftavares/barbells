import { PrismaWorkoutsRepository } from '@/repositories/prisma/prisma-workouts-repository'
import { DeleteWorkoutUseCase } from '../workouts/delete'

export function makeDeleteWorkoutUseCase() {
  const workoutsRepository = new PrismaWorkoutsRepository()
  const deleteWorkoutUseCase = new DeleteWorkoutUseCase(workoutsRepository)

  return deleteWorkoutUseCase
}
