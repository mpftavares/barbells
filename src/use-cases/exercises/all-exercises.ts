import { ExercisesRepository } from "@/repositories/exercises-repository";
import { Exercise } from "@prisma/client";

interface GetAllExercisesUseCaseRequest {
    userId: string
}

interface GetAllExercisesUseCaseResponse {
    exercises: Exercise[]
}

export class GetAllExercisesUseCase {

    constructor(private exercisesRepository: ExercisesRepository) { }

    async execute({
        userId
    }: GetAllExercisesUseCaseRequest): Promise<GetAllExercisesUseCaseResponse> {

        const exercises = await this.exercisesRepository.getAll(userId);

        return {
            exercises
        };
    }
}
