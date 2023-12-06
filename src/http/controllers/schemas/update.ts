import { makeUpdateSchemaUseCase } from "@/use-cases/factories/schemas/make-update-schema-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateSchema(request: FastifyRequest<{ Params: { schemaId: string } }>, reply: FastifyReply) {

    const updateSchemaParamsSchema = z.object({
        exerciseId: z.string({
            required_error: "exerciseId is required",
            invalid_type_error: "exerciseId must be an uuid",
          }),
        number: z.number({
            required_error: "Exercise number is required",
            invalid_type_error: "Exercise number must be a number",
          }),
        sets: z.number({
            required_error: "Sets is required",
            invalid_type_error: "Sets must be a number",
          }),
        reps: z.string({
            required_error: "Reps is required",
            invalid_type_error: "Reps must be a string",
          })
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