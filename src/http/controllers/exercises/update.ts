import { makeUpdateExerciseUseCase } from "@/use-cases/factories/make-update-exercise-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateExercise(request: FastifyRequest, reply: FastifyReply) {

    const updateExerciseParamsSchema = z.object({
        id: z.string(),
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

    const { id, name, equipment, unilateral } = updateExerciseParamsSchema.parse(request.body)

    const updateExerciseUseCase = makeUpdateExerciseUseCase()

    await updateExerciseUseCase.execute({
        id,
        name,
        equipment,
        unilateral,
    })
    return reply.status(204).send();
}