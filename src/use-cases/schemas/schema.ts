import { SchemasRepository } from "@/repositories/schemas-repository";
import { Schema } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetSchemaUseCaseRequest {
    schemaId: string
}

interface GetSchemaUseCaseResponse {
    schema: Schema
}

export class GetSchemaUseCase {

    constructor(private schemasRepository: SchemasRepository) { }

    async execute({
        schemaId
    }: GetSchemaUseCaseRequest): Promise<GetSchemaUseCaseResponse> {

        const schema = await this.schemasRepository.findById(schemaId);

        if (!schema) {
            throw new ResourceNotFoundError();
        }

        return {
            schema,
        };
    }
}
