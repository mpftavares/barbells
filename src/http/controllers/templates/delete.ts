import { makeDeleteTemplateUseCase } from "@/use-cases/factories/templates/make-delete-template-use-case";
import { FastifyReply, FastifyRequest } from "fastify"

export async function deleteTemplate(request: FastifyRequest<{ Params: { templateId: string } }>, reply: FastifyReply) {
    try {
        const deleteTemplate = makeDeleteTemplateUseCase();

        const isTemplateDeleted = await deleteTemplate.execute({
            templateId: request.params.templateId
        });

        if (isTemplateDeleted.success) {
            return reply.status(200).send({ message: 'Template deleted successfully 👌' });
        } else {
            return reply.status(404).send({ message: 'Template not found 🤷' });
        }
    } catch (error) {
        console.error("Error deleting template:", error);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}