import { PrismaWorkoutsRepository } from '@/repositories/prisma/prisma-workouts-repository'
import { GetWorkoutUseCase } from '../workouts/workout'

export function makeGetWorkoutUseCase() {
  const workoutsRepository = new PrismaWorkoutsRepository()
  const getWorkoutUseCase = new GetWorkoutUseCase(workoutsRepository)

  return getWorkoutUseCase
}
