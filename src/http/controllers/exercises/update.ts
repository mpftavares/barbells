import { verifyPermission } from "@/http/middlewares/verify-permission";
import { makeGetExerciseUseCase } from "@/use-cases/factories/exercises/make-get-exercise-use-case";
import { makeUpdateExerciseUseCase } from "@/use-cases/factories/exercises/make-update-exercise-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateExercise(request: FastifyRequest<{ Params: { exerciseId: string } }>, reply: FastifyReply) {

    const updateExerciseParamsSchema = z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
          }),
        equipment: z.enum([
            "assisted",
            "barbell",
            "bodyweight",
            "cable",
            "dumbbells",
            "machine"
        ],
        {
            required_error: "Equipment is required",
          }),
        unilateral: z.optional(z.boolean()),
    })

    const { name, equipment, unilateral } = updateExerciseParamsSchema.parse(request.body)

    const id = request.params.exerciseId

    const getExercise = makeGetExerciseUseCase()

    const { exercise } = await getExercise.execute({
        exerciseId: id,
    })

    verifyPermission(exercise.userId, request, reply)

    const updateExerciseUseCase = makeUpdateExerciseUseCase()

    await updateExerciseUseCase.execute({
        id,
        name,
        equipment,
        unilateral
    })
    return reply.status(204).send();
}