import { WorkoutsRepository } from '@/repositories/workouts-repository'
import { calculateWorkoutVolume } from '@/utils/test/calculate-workout-volume.ts'
import { Workout } from '@prisma/client'

interface SearchWorkoutsByDateUseCaseRequest {
    userId: string
    startDate: string
    endDate: string
    muscle?: string
}

interface SearchWorkoutsByDateUseCaseResponse {
    workouts: Workout[]
    volume: number
}

export class SearchWorkoutsByDateUseCase {
    constructor(private workoutsRepository: WorkoutsRepository) { }

    async execute({
        userId,
        startDate,
        endDate,
        muscle
    }: SearchWorkoutsByDateUseCaseRequest): Promise<SearchWorkoutsByDateUseCaseResponse> {
        const workouts = await this.workoutsRepository.findByDateRange(
            userId,
            startDate,
            endDate
        )

        let volume = 0


        for (const workout of workouts) {
            const sets = await this.workoutsRepository.getWorkoutSets(workout.id);

            const workoutVolume = await calculateWorkoutVolume(sets, muscle)

            volume += workoutVolume
        }

        return {
            workouts, volume
        }
    }
}
