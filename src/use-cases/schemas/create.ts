import { SchemasRepository } from "@/repositories/schemas-repository"
import { Schema } from "@prisma/client"
import { FailedToCreateResourceError } from "../errors/failed-to-create-resource.error"

interface CreateSchemaUseCaseRequest {
    templateId: string
    number: number
    exerciseId: string
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
        number,
        exerciseId,
        sets,
        reps
    }: CreateSchemaUseCaseRequest): Promise<CreateSchemaUseCaseResponse> {

        const schema = await this.schemasRepository.create({
            templateId,
            number,
            exerciseId,
            sets,
            reps
        })

        if (!schema) {
            throw new FailedToCreateResourceError();
        }

        return { schema }
    }
}