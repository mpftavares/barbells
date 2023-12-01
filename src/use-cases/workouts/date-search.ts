import { WorkoutsRepository } from '@/repositories/workouts-repository'
import { Workout } from '@prisma/client'

interface SearchUserWorkoutDateUseCaseRequest {
    userId: string
    startDate: Date
    endDate: Date
}

interface SearchUserWorkoutDateUseCaseResponse {
    workouts: Workout[]
}

export class SearchUserWorkoutDateUseCase {
    constructor(private workoutsRepository: WorkoutsRepository) { }

    async execute({
        userId,
        startDate,
        endDate
    }: SearchUserWorkoutDateUseCaseRequest): Promise<SearchUserWorkoutDateUseCaseResponse> {
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
