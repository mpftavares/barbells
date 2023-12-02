import { makeCreateTemplateUseCase } from "@/use-cases/factories/templates/make-create-template-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createTemplate(request: FastifyRequest, reply: FastifyReply) {

    const createTemplateParamsSchema = z.object({
        name: z.string(),
        schemas: z.object({
            create: z.array(
                z.object({
                    exerciseId: z.string(),
                    number: z.number(),
                    sets: z.number(),
                    reps: z.string()
                })
            )
        })
    })

    const { name, schemas } = createTemplateParamsSchema.parse(request.body)

    const createTemplateUseCase = makeCreateTemplateUseCase()

    await createTemplateUseCase.execute({
        name,
        userId: request.user.sub,
        schemas
    })
    return reply.status(201).send();

}