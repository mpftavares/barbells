import { WorkoutsRepository } from "@/repositories/workouts-repository";
import { calculateWorkoutVolume } from "@/utils/test/calculate-workout-volume.ts";
import { Workout } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetWorkoutUseCaseRequest {
    workoutId: string
    muscle?: string
}

interface GetWorkoutUseCaseResponse {
    workout: Workout
    volume: number
}

export class GetWorkoutUseCase {

    constructor(private workoutsRepository: WorkoutsRepository) { }

    async execute({
        workoutId,
        muscle,
    }: GetWorkoutUseCaseRequest): Promise<GetWorkoutUseCaseResponse> {

        const workout = await this.workoutsRepository.findById(workoutId);

        if (!workout) {
            throw new ResourceNotFoundError();
        }

        const sets = await this.workoutsRepository.getWorkoutSets(workoutId);

        const volume = await calculateWorkoutVolume(sets, muscle)

        return {
            workout, volume
        };
    }
}
