import { makeCreateTemplateUseCase } from "@/use-cases/factories/templates/make-create-template-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createTemplate(request: FastifyRequest, reply: FastifyReply) {

    const createTemplateParamsSchema = z.object({
        name: z.string(),
    })

    const { name } = createTemplateParamsSchema.parse(request.body)

    const createTemplateUseCase = makeCreateTemplateUseCase()

    await createTemplateUseCase.execute({
        name,
        userId: request.user.sub
    })
    return reply.status(201).send();

}