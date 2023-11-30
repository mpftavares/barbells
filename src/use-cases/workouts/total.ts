import { WorkoutsRepository } from '@/repositories/workouts-repository'

interface UserWorkoutTotalUseCaseRequest {
    userId: string
}

interface UserWorkoutTotalUseCaseResponse {
    count: number
}

export class UserWorkoutTotalUseCase {
    constructor(private workoutsRepository: WorkoutsRepository) { }

    async execute({
        userId,
    }: UserWorkoutTotalUseCaseRequest): Promise<UserWorkoutTotalUseCaseResponse> {
        const count = await this.workoutsRepository.countByUserId(
            userId,
        )

        return {
            count,
        }
    }
}
