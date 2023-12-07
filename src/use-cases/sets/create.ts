import { SetsRepository } from "@/repositories/sets-repository"
import { Set } from "@prisma/client"
import { FailedToCreateResourceError } from "../errors/failed-to-create-resource.error"

interface CreateSetUseCaseRequest {
    workoutId: string
    number: number
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
        number,
        exerciseId,
        weight,
        reps
    }: CreateSetUseCaseRequest): Promise<CreateSetUseCaseResponse> {

        const set = await this.setsRepository.create({
            workoutId,
            number,
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