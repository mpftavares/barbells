import { ExercisesRepository } from "@/repositories/exercises-repository";
import { Exercise } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetExerciseUseCaseRequest {
    exerciseId: string;
}

interface GetExerciseUseCaseResponse {
    exercise: Exercise;
}

export class GetExerciseUseCase {

    constructor(private exercisesRepository: ExercisesRepository) { }

    async execute({
        exerciseId
    }: GetExerciseUseCaseRequest): Promise<GetExerciseUseCaseResponse> {

        const exercise = await this.exercisesRepository.findById(exerciseId);

        if (!exercise) {
            throw new ResourceNotFoundError();
        }

        return {
            exercise,
        };
    }
}
