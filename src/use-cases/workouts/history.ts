import { WorkoutsRepository } from '@/repositories/workouts-repository'
import { Workout } from '@prisma/client'

interface FetchUserWorkoutsHistoryUseCaseRequest {
    userId: string
}

interface FetchUserWorkoutsHistoryUseCaseResponse {
    workouts: Workout[]
}

export class FetchUserWorkoutsHistoryUseCase {
    constructor(private workoutsRepository: WorkoutsRepository) { }

    async execute({
        userId,
    }: FetchUserWorkoutsHistoryUseCaseRequest): Promise<FetchUserWorkoutsHistoryUseCaseResponse> {
        const workouts = await this.workoutsRepository.findByUserId(
            userId,
        )

        return {
            workouts,
        }
    }
}
