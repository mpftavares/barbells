import { makeCreateWorkoutUseCase } from "@/use-cases/factories/make-create-workout-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createWorkout(request: FastifyRequest, reply: FastifyReply) {

    const createWorkoutParamsSchema = z.object({
        name: z.optional(z.string().nullable()),
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