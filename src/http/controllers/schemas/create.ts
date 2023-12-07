import { makeCreateSchemaUseCase } from "@/use-cases/factories/schemas/make-create-schema-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createSchema(request: FastifyRequest, reply: FastifyReply) {

  const createSchemaParamsSchema = z.object({
    templateId: z.string({
      required_error: "templateId is required",
      invalid_type_error: "templateId must be a uuid",
    }).uuid(),
    number: z.number({
      required_error: "Exercise number is required",
      invalid_type_error: "Exercise number must be a number",
    }).positive(),
    exerciseId: z.string({
      required_error: "exerciseId is required",
      invalid_type_error: "exerciseId must be a uuid",
    }).uuid(),
    sets: z.number({
      required_error: "Sets is required",
      invalid_type_error: "Sets must be a number",
    }).positive(),
    reps: z.string({
      required_error: "Reps is required",
      invalid_type_error: "Reps must be a string",
    })
  })

  const { templateId, number, exerciseId, sets, reps } = createSchemaParamsSchema.parse(request.body)

  const createSchemaUseCase = makeCreateSchemaUseCase()

  await createSchemaUseCase.execute({
    templateId,
    number,
    exerciseId,
    sets,
    reps,
  })
  return reply.status(201).send();

}