import { makeCreateExerciseUseCase } from "@/use-cases/factories/exercises/make-create-exercise-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createExercise(request: FastifyRequest, reply: FastifyReply) {

    const createExerciseParamsSchema = z.object({
        name: z.string(),
        equipment: z.enum([
            "assisted",
            "barbell",
            "bodyweight",
            "cable",
            "dumbells",
            "machine"
        ]),
        unilateral: z.optional(z.boolean())
    })

    const { name, equipment, unilateral } = createExerciseParamsSchema.parse(request.body)

    const createExerciseUseCase = makeCreateExerciseUseCase()

    await createExerciseUseCase.execute({
        name,
        equipment,
        unilateral,
        userId: request.user.sub
    })
    return reply.status(201).send();

}