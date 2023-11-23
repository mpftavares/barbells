import { SetsRepository } from "@/repositories/sets-repository"
import { Set } from "@prisma/client"

interface CreateSetUseCaseRequest {
    workoutId: string
    exerciseId: string
    weight: number
    reps: number
}

interface CreateSetUseCaseResponse {
    set: Set
}

export class CreateSetUseCase {

    constructor(private setsRepository: SetsRepository) { }

    async execute({
        workoutId,
        exerciseId,
        weight,
        reps
    }: CreateSetUseCaseRequest): Promise<CreateSetUseCaseResponse> {

        const set = await this.setsRepository.create({
            workoutId,
            exerciseId,
            weight,
            reps
        })

        if (!set) {
            throw new Error('Failed to create set 🤦');
        }

        return { set }
    }
}