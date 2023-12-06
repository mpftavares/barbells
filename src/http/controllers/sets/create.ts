import { makeCreateSetUseCase } from "@/use-cases/factories/sets/make-create-set-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createSet(request: FastifyRequest, reply: FastifyReply) {

    const createSetParamsSchema = z.object({
        workoutId: z.string({
            required_error: "workoutId is required",
            invalid_type_error: "workoutId must be an uuid",
          }),
        exerciseId: z.string({
            required_error: "exerciseId is required",
            invalid_type_error: "exerciseId must be an uuid",
          }),
        weight: z.optional(z.number().positive()),
        reps: z.number().positive()
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