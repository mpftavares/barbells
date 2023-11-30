import { WorkoutsRepository } from '@/repositories/workouts-repository'
import { Workout } from '@prisma/client'

interface UserWorkoutsHistoryUseCaseRequest {
    userId: string
}

interface UserWorkoutsHistoryUseCaseResponse {
    workouts: Workout[]
}

export class UserWorkoutsHistoryUseCase {
    constructor(private workoutsRepository: WorkoutsRepository) { }

    async execute({
        userId,
    }: UserWorkoutsHistoryUseCaseRequest): Promise<UserWorkoutsHistoryUseCaseResponse> {
        const workouts = await this.workoutsRepository.findByUserId(
            userId,
        )

        return {
            workouts,
        }
    }
}
