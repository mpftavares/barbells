import { WorkoutsRepository } from "@/repositories/workouts-repository"
import { Workout } from "@prisma/client"

interface CreateWorkoutUseCaseRequest {
    name?: string | null
    timestamp?: string | undefined
    userId: string
}

interface CreateWorkoutUseCaseResponse {
    workout: Workout
}

export class CreateWorkoutUseCase {

    constructor(private workoutsRepository: WorkoutsRepository) { }

    async execute({
        name,
        timestamp,
        userId
    }: CreateWorkoutUseCaseRequest): Promise<CreateWorkoutUseCaseResponse> {

        const workout = await this.workoutsRepository.create({
            name,
            timestamp,
            userId
        })

        if (!workout) {
            throw new Error('Failed to create workout 🤦');
        }

        return { workout }
    }
}