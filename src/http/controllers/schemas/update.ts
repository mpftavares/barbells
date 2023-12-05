import { makeUpdateSchemaUseCase } from "@/use-cases/factories/schemas/make-update-schema-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateSchema(request: FastifyRequest<{ Params: { schemaId: string } }>, reply: FastifyReply) {

    const updateSchemaParamsSchema = z.object({
        exerciseId: z.string(),
        number: z.number(),
        sets: z.number(),
        reps: z.string()
    })

    const { exerciseId, number, sets, reps } = updateSchemaParamsSchema.parse(request.body)

    const id = request.params.schemaId

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