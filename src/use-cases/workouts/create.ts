import { WorkoutsRepository } from "@/repositories/workouts-repository"
import { Workout } from "@prisma/client"
import { FailedToCreateResourceError } from "../errors/failed-to-create-resource.error"

interface CreateWorkoutUseCaseRequest {
    name?: string | null
    timestamp?: string | undefined
    userId: string
    sets: {
        create: {
            exerciseId: string
            weight?: number
            reps: number
        }[]
    }
}

interface CreateWorkoutUseCaseResponse {
    workout: Workout
}

export class CreateWorkoutUseCase {

    constructor(private workoutsRepository: WorkoutsRepository) { }

    async execute({
        name,
        timestamp,
        userId,
        sets
    }: CreateWorkoutUseCaseRequest): Promise<CreateWorkoutUseCaseResponse> {

        const workout = await this.workoutsRepository.create({
            name,
            timestamp,
            userId,
            sets
        })

        if (!workout) {
            throw new FailedToCreateResourceError();
        }

        return { workout }
    }
}