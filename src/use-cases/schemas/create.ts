import { SchemasRepository } from "@/repositories/schemas-repository"
import { Equipment, Schema } from "@prisma/client"
import { FailedToCreateResourceError } from "../errors/failed-to-create-resource.error"

interface CreateSchemaUseCaseRequest {
    templateId: string
    exerciseId: string
    number: number
    sets: number
    reps: string
}

interface CreateSchemaUseCaseResponse {
    schema: Schema
}

export class CreateSchemaUseCase {

    constructor(private schemasRepository: SchemasRepository) { }

    async execute({
        templateId,
        exerciseId,
        number,
        sets,
        reps
    }: CreateSchemaUseCaseRequest): Promise<CreateSchemaUseCaseResponse> {

        const schema = await this.schemasRepository.create({
            templateId,
            exerciseId,
            number,
            sets,
            reps
        })

        if (!schema) {
            throw new FailedToCreateResourceError();
        }

        return { schema }
    }
}