import { SchemasRepository } from "@/repositories/schemas-repository";
import { FailedToDeleteResourceError } from "../errors/failed-to-delete-resource.error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteSchemaUseCaseRequest {
    schemaId: string
}

interface DeleteSchemaUseCaseResponse {
    success: boolean
}

export class DeleteSchemaUseCase {

    constructor(private schemasRepository: SchemasRepository) { }

    async execute({
        schemaId
    }: DeleteSchemaUseCaseRequest): Promise<DeleteSchemaUseCaseResponse> {
        const schema = await this.schemasRepository.findById(schemaId);

        if (!schema) {
            throw new ResourceNotFoundError();
        }

        const isSchemaDeleted = await this.schemasRepository.delete(schemaId);

        if (!isSchemaDeleted) {
            throw new FailedToDeleteResourceError()
        }

        return {
            success: isSchemaDeleted,
        };
    }
}
