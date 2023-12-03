import { prisma } from "@/lib/prisma";
import { WorkoutsRepository } from "@/repositories/workouts-repository";
import { Workout } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetWorkoutUseCaseRequest {
    workoutId: string
}

interface GetWorkoutUseCaseResponse {
    workout: Workout
    volume: number
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

        const sets = await this.workoutsRepository.getWorkoutSets(workoutId);

        let volume = 0;

        for (const set of sets) {
            if (set.weight !== null) {

                const { exerciseId } = set

                const exercise = await prisma.exercise.findFirstOrThrow({ where: { id: exerciseId } })

                if (exercise.unilateral) {
                    volume += (set.reps * set.weight) * 2;
                } else {
                    volume += set.reps * set.weight;
                }
            }
        }

        return {
            workout, volume
        };
    }
}
