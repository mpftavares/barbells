import { makeUpdateSetUseCase } from "@/use-cases/factories/make-update-set-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateSet(request: FastifyRequest, reply: FastifyReply) {

    const updateSetParamsSchema = z.object({
        id: z.string(),
        weight: z.number(),
        reps: z.number()
    })

    const { id, weight, reps } = updateSetParamsSchema.parse(request.body)

    const updateSetUseCase = makeUpdateSetUseCase()

    await updateSetUseCase.execute({
        id,
        weight,
        reps,
    })
    return reply.status(204).send();
}