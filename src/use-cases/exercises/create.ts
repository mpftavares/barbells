import { ExercisesRepository } from "@/repositories/exercises-repository"
import { Equipment, Exercise, Muscle } from "@prisma/client"
import { FailedToCreateResourceError } from "../errors/failed-to-create-resource.error"
import { ResourceAlreadyExistsError } from "../errors/item-already-exists-error"

interface CreateExerciseUseCaseRequest {
    name: string
    equipment: Equipment
    unilateral?: boolean
    userId: string
    targets?: {
        create: {
            muscle: Muscle;
        }[];
    }
}

interface CreateExerciseUseCaseResponse {
    exercise: Exercise
}

export class CreateExerciseUseCase {
    constructor(
        private exercisesRepository: ExercisesRepository,
    ) { }

    async execute({
        name,
        equipment,
        unilateral,
        userId,
        targets
    }: CreateExerciseUseCaseRequest): Promise<CreateExerciseUseCaseResponse> {

        const exerciseAlreadyExists = await this.exercisesRepository.doesExerciseAlreadyExist(name, equipment, unilateral)

        if (exerciseAlreadyExists) {
            throw new ResourceAlreadyExistsError()
        }

        const exercise = await this.exercisesRepository.create({
            name,
            equipment,
            unilateral,
            userId,
            targets
        });

        if (!exercise) {
            throw new FailedToCreateResourceError();
        }

        return { exercise };
    }
}
