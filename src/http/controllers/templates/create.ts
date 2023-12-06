import { makeCreateTemplateUseCase } from "@/use-cases/factories/templates/make-create-template-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createTemplate(request: FastifyRequest, reply: FastifyReply) {

    const createTemplateParamsSchema = z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
          }),
        schemas: z.object({
            create: z.array(
                z.object({
                    exerciseId: z.string({
                        required_error: "exerciseId is required",
                        invalid_type_error: "exerciseId must be a uuid",
                      }),
                    sets: z.number({
                        required_error: "Number of sets is required",
                        invalid_type_error: "Number of sets must be a number",
                      }).positive(),
                    reps: z.string({
                        required_error: "Reps is required",
                        invalid_type_error: "Reps must be a string",
                      })
                })
            )
        })
    })

    const { name, schemas } = createTemplateParamsSchema.parse(request.body)

    const createTemplateUseCase = makeCreateTemplateUseCase()

    await createTemplateUseCase.execute({
        name,
        userId: request.user.sub,
        schemas
    })
    return reply.status(201).send();

}