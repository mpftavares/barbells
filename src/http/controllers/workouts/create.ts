import { makeCreateWorkoutUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {

    const createWorkoutParamsSchema = z.object({
        name: z.string().nullable(),
        timestamp: z.optional(z.string().datetime())
    })

    const { name, timestamp } = createWorkoutParamsSchema.parse(request.body)

    const createWorkoutUseCase = makeCreateWorkoutUseCase()

    await createWorkoutUseCase.execute({
        name,
        timestamp,
        userId: request.user.sub
    })
    return reply.status(201).send();

}