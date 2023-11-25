import { SchemasRepository } from "@/repositories/schemas-repository";
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
            throw new Error('Failed to delete schema 🤦');
        }

        return {
            success: isSchemaDeleted,
        };
    }
}
