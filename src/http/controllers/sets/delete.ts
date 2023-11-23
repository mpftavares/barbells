import { makeDeleteSetUseCase } from "@/use-cases/factories/make-delete-set-use-case";
import { FastifyReply, FastifyRequest } from "fastify"

export async function deleteSet(request: FastifyRequest<{ Params: { setId: string } }>, reply: FastifyReply) {
    try {
        const deleteSet = makeDeleteSetUseCase();

        const isSetDeleted = await deleteSet.execute({
            setId: request.params.setId
        });

        if (isSetDeleted.success) {
            return reply.status(200).send({ message: 'Set deleted successfully 👌' });
        } else {
            return reply.status(404).send({ message: 'Set not found 🤷' });
        }
    } catch (error) {
        console.error("Error deleting set:", error);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}