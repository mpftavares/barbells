import { verifyPermission } from "@/http/middlewares/verify-permission";
import { makeGetTemplateUseCase } from "@/use-cases/factories/templates/make-get-template-use-case";
import { makeUpdateTemplateUseCase } from "@/use-cases/factories/templates/make-update-template-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateTemplate(request: FastifyRequest<{ Params: { templateId: string } }>, reply: FastifyReply) {

    const updateTemplateParamsSchema = z.object({
        name: z.string(),
    })

    const { name } = updateTemplateParamsSchema.parse(request.body)

    const id = request.params.templateId

    const getTemplate = makeGetTemplateUseCase()

    const { template } = await getTemplate.execute({
        templateId: id,
    })

    verifyPermission(template.userId, request, reply)

    const updateTemplateUseCase = makeUpdateTemplateUseCase()

    await updateTemplateUseCase.execute({
        id,
        name
    })
    return reply.status(204).send();
}