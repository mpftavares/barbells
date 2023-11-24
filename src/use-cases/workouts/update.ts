import { WorkoutsRepository } from '@/repositories/workouts-repository'
import { Workout } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateWorkoutUseCaseRequest {
  id: string
  name?: string | null
  timestamp?: string | undefined
}

interface UpdateWorkoutUseCaseResponse {
  updatedWorkout: Workout
}

export class UpdateWorkoutUseCase {
  constructor(private workoutsRepository: WorkoutsRepository) { }

  async execute({
    id,
    name,
    timestamp
  }: UpdateWorkoutUseCaseRequest): Promise<UpdateWorkoutUseCaseResponse> {

    const workoutToUpdate = await this.workoutsRepository.findById(id);

    if (!workoutToUpdate) {
      throw new ResourceNotFoundError()
    }

    const data = { name, timestamp }

    const updatedWorkout = await this.workoutsRepository.update(
      id,
      data
    )

    if (!updatedWorkout) {
      throw new Error('Failed to update update workout 🤦');
    }

    return { updatedWorkout };
  }
}