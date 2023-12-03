import { WorkoutsRepository } from "@/repositories/workouts-repository";
import { FailedToDeleteResourceError } from "../errors/failed-to-delete-resource.error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteWorkoutUseCaseRequest {
    workoutId: string
}

interface DeleteWorkoutUseCaseResponse {
    success: boolean
}

export class DeleteWorkoutUseCase {

    constructor(private workoutsRepository: WorkoutsRepository) { }

    async execute({
        workoutId
    }: DeleteWorkoutUseCaseRequest): Promise<DeleteWorkoutUseCaseResponse> {
        const workout = await this.workoutsRepository.findById(workoutId);

        if (!workout) {
            throw new ResourceNotFoundError();
        }

        const isWorkoutDeleted = await this.workoutsRepository.delete(workoutId);

        if (!isWorkoutDeleted) {
            throw new FailedToDeleteResourceError()
        }

        return {
            success: isWorkoutDeleted,
        };
    }
}
