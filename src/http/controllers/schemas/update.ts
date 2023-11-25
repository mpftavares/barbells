import { makeUpdateSchemaUseCase } from "@/use-cases/factories/schemas/make-update-schema-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateSchema(request: FastifyRequest, reply: FastifyReply) {

    const updateSchemaParamsSchema = z.object({
        id: z.string(),
        exerciseId: z.string(),
        number: z.number(),
        sets: z.number(),
        reps: z.string()
    })

    const { id, exerciseId, number, sets, reps } = updateSchemaParamsSchema.parse(request.body)

    const updateSchemaUseCase = makeUpdateSchemaUseCase()

    await updateSchemaUseCase.execute({
        id,
        exerciseId,
        number,
        sets,
        reps,
    })
    return reply.status(204).send();
}