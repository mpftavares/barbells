import { WorkoutsRepository } from '@/repositories/workouts-repository';
import { FailedToDeleteResourceError } from '../errors/failed-to-delete-resource.error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteUserWorkoutsHistoryUseCaseRequest {
  userId: string;
}

interface DeleteUserWorkoutsHistoryUseCaseResponse {
  success: boolean;
}

export class DeleteUserWorkoutsHistoryUseCase {
  constructor(private workoutsRepository: WorkoutsRepository) { }

  async execute({
    userId,
  }: DeleteUserWorkoutsHistoryUseCaseRequest): Promise<DeleteUserWorkoutsHistoryUseCaseResponse> {
    const userWorkouts = await this.workoutsRepository.findByUserId(userId);

    if (userWorkouts.length === 0) {
      throw new ResourceNotFoundError();
    }

    const workoutIds = userWorkouts.map((workout) => workout.id);

    const areWorkoutsDeleted = await this.workoutsRepository.deleteAll(workoutIds);

    if (!areWorkoutsDeleted) {
      throw new FailedToDeleteResourceError()
    }

    return {
      success: areWorkoutsDeleted,
    };
  }
}
