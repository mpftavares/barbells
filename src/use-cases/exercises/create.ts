import { ExercisesRepository } from "@/repositories/exercises-repository"
import { TargetsRepository } from "@/repositories/targets-repository"
import { Equipment, Exercise, Muscle } from "@prisma/client"

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
        private targetsRepository: TargetsRepository
    ) { }

    async execute({
        name,
        equipment,
        unilateral,
        userId,
        targets
    }: CreateExerciseUseCaseRequest): Promise<CreateExerciseUseCaseResponse> {
        const exercise = await this.exercisesRepository.create({
            name,
            equipment,
            unilateral,
            userId,
            targets
        });

        if (!exercise) {
            throw new Error('Failed to create exercise 🤦');
        }

        const createdTargets: Muscle[] = [];
        if (targets && targets.create) {
            for (const target of targets.create) {
                const createdTarget = await this.targetsRepository.create({
                    exerciseId: exercise.id,
                    muscle: target.muscle
                });
                createdTargets.push(createdTarget.muscle);
            }
        }

        return { exercise };
    }
}
