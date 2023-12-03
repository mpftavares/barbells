import { SetsRepository } from "@/repositories/sets-repository"
import { Set } from "@prisma/client"
import { FailedToCreateResourceError } from "../errors/failed-to-create-resource.error"

interface CreateSetUseCaseRequest {
    workoutId: string
    exerciseId: string
    weight?: number
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
            throw new FailedToCreateResourceError();
        }

        return { set }
    }
}