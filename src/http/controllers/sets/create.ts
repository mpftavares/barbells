import { makeCreateSetUseCase } from "@/use-cases/factories/make-create-set-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createSet(request: FastifyRequest, reply: FastifyReply) {

    const createSetParamsSchema = z.object({
        workoutId: z.string(),
        exerciseId: z.string(),
        weight: z.optional(z.number()),
        reps: z.number()
    })

    const { workoutId, exerciseId, weight, reps } = createSetParamsSchema.parse(request.body)

    const createSetUseCase = makeCreateSetUseCase()

    await createSetUseCase.execute({
        workoutId,
        exerciseId,
        weight,
        reps,
    })
    return reply.status(201).send();

}