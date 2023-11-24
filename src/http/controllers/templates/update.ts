import { makeUpdateTemplateUseCase } from "@/use-cases/factories/templates/make-update-template-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateTemplate(request: FastifyRequest, reply: FastifyReply) {

    const updateTemplateParamsSchema = z.object({
        id: z.string(),
        name: z.string(),
    })

    const { id, name } = updateTemplateParamsSchema.parse(request.body)

    const updateTemplateUseCase = makeUpdateTemplateUseCase()

    await updateTemplateUseCase.execute({
        id,
        name
    })
    return reply.status(204).send();
}