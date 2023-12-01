import { makeCreateWorkoutUseCase } from "@/use-cases/factories/workouts/make-create-workout-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createWorkout(request: FastifyRequest, reply: FastifyReply) {

    const createWorkoutParamsSchema = z.object({
        name: z.optional(z.string().nullable()),
        timestamp: z.optional(z.string().datetime()),
        sets: z.object({
            create: z.array(
                z.object({
                    exerciseId: z.string(),
                    weight: z.optional(z.number()),
                    reps: z.number()
                })
            )
        })
    })

    const { name, timestamp, sets } = createWorkoutParamsSchema.parse(request.body)

    const createWorkoutUseCase = makeCreateWorkoutUseCase()

    await createWorkoutUseCase.execute({
        name,
        timestamp,
        userId: request.user.sub,
        sets
    })
    return reply.status(201).send();

}