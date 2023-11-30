import { WorkoutsRepository } from '@/repositories/workouts-repository'
import { Workout } from '@prisma/client'

interface UserWorkoutsByDateUseCaseRequest {
    userId: string
    startDate: Date
    endDate: Date
}

interface UserWorkoutsByDateUseCaseResponse {
    workouts: Workout[]
}

export class UserWorkoutsByDateUseCase {
    constructor(private workoutsRepository: WorkoutsRepository) { }

    async execute({
        userId,
        startDate,
        endDate
    }: UserWorkoutsByDateUseCaseRequest): Promise<UserWorkoutsByDateUseCaseResponse> {
        const workouts = await this.workoutsRepository.findByDateRange(
            userId,
            startDate,
            endDate
        )

        return {
            workouts,
        }
    }
}
