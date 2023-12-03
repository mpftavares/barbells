import { WorkoutsRepository } from '@/repositories/workouts-repository'
import { Workout } from '@prisma/client'

interface SearchWorkoutsByDateUseCaseRequest {
    userId: string
    startDate: string
    endDate: string
}

interface SearchWorkoutsByDateUseCaseResponse {
    workouts: Workout[]
}

export class SearchWorkoutsByDateUseCase {
    constructor(private workoutsRepository: WorkoutsRepository) { }

    async execute({
        userId,
        startDate,
        endDate
    }: SearchWorkoutsByDateUseCaseRequest): Promise<SearchWorkoutsByDateUseCaseResponse> {
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
