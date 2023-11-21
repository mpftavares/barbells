import { WorkoutsRepository } from "@/repositories/workouts-repository";
import { Workout } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetWorkoutUseCaseRequest {
    workoutId: string;
}

interface GetWorkoutUseCaseResponse {
    workout: Workout;
}

export class GetWorkoutUseCase {

    constructor(private workoutsRepository: WorkoutsRepository) { }

    async execute({
        workoutId
    }: GetWorkoutUseCaseRequest): Promise<GetWorkoutUseCaseResponse> {

        const workout = await this.workoutsRepository.findById(workoutId);

        if (!workout) {
            throw new ResourceNotFoundError();
        }

        return {
            workout,
        };
    }
}
