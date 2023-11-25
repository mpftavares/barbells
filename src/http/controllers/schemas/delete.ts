import { makeDeleteSchemaUseCase } from "@/use-cases/factories/schemas/make-delete-schema-use-case";
import { FastifyReply, FastifyRequest } from "fastify"

export async function deleteSchema(request: FastifyRequest<{ Params: { schemaId: string } }>, reply: FastifyReply) {
    try {
        const deleteSchema = makeDeleteSchemaUseCase();

        const isSchemaDeleted = await deleteSchema.execute({
            schemaId: request.params.schemaId
        });

        if (isSchemaDeleted.success) {
            return reply.status(200).send({ message: 'Schema deleted successfully 👌' });
        } else {
            return reply.status(404).send({ message: 'Schema not found 🤷' });
        }
    } catch (error) {
        console.error("Error deleting schema:", error);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}