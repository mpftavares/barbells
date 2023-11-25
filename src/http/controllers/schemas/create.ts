import { makeCreateSchemaUseCase } from "@/use-cases/factories/schemas/make-create-schema-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createSchema(request: FastifyRequest, reply: FastifyReply) {

    const createSchemaParamsSchema = z.object({
        templateId: z.string(),
        exerciseId: z.string(),
        number: z.number(),
        sets: z.number(),
        reps: z.string()
    })

    const { templateId, exerciseId, number, sets, reps } = createSchemaParamsSchema.parse(request.body)

    const createSchemaUseCase = makeCreateSchemaUseCase()

    await createSchemaUseCase.execute({
        templateId,
        exerciseId,
        number,
        sets,
        reps,
    })
    return reply.status(201).send();

}