import { PrismaWorkoutsRepository } from '@/repositories/prisma/prisma-workouts-repository'
import { GetWorkoutUseCase } from '../get-workout'

export function makeGetWorkoutUseCase() {
  const workoutsRepository = new PrismaWorkoutsRepository()
  const useCase = new GetWorkoutUseCase(workoutsRepository)

  return useCase
}
