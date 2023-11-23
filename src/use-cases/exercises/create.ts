import { ExercisesRepository } from "@/repositories/exercises-repository"
import { Equipment, Exercise } from "@prisma/client"

interface CreateExerciseUseCaseRequest {
    name: string,
    equipment: Equipment,
    unilateral: boolean,
    userId: string,
}

interface CreateExerciseUseCaseResponse {
    exercise: Exercise
}

export class CreateExerciseUseCase {

    constructor(private exercisesRepository: ExercisesRepository) { }

    async execute({
        name,
        equipment,
        unilateral,
        userId
    }: CreateExerciseUseCaseRequest): Promise<CreateExerciseUseCaseResponse> {

        const exercise = await this.exercisesRepository.create({
            name,
            equipment,
            unilateral,
            userId,
        })

        if (!exercise) {
            throw new Error('Failed to create exercise 🤦');
        }

        return { exercise }
    }
}