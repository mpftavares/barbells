import { WorkoutsRepository } from '@/repositories/workouts-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteAllUserWorkoutsHistoryUseCaseRequest {
  userId: string;
}

interface DeleteAllUserWorkoutsHistoryUseCaseResponse {
  success: boolean;
}

export class DeleteUserWorkoutsHistoryUseCase {
  constructor(private workoutsRepository: WorkoutsRepository) { }

  async execute({
    userId,
  }: DeleteAllUserWorkoutsHistoryUseCaseRequest): Promise<DeleteAllUserWorkoutsHistoryUseCaseResponse> {
    const userWorkouts = await this.workoutsRepository.findByUser(userId);

    if (userWorkouts.length === 0) {
      throw new ResourceNotFoundError();
    }

    const workoutIds = userWorkouts.map((workout) => workout.id);

    const areWorkoutsDeleted = await this.workoutsRepository.deleteAll(workoutIds);

    if (!areWorkoutsDeleted) {
      throw new Error('Failed to delete user workouts workouts 🙊');
    }

    return {
      success: areWorkoutsDeleted,
    };
  }
}
