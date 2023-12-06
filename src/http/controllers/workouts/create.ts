import { makeCreateWorkoutUseCase } from "@/use-cases/factories/workouts/make-create-workout-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createWorkout(request: FastifyRequest, reply: FastifyReply) {

    const createWorkoutParamsSchema = z.object({
        name: z.optional(z.string({
            invalid_type_error: "Name must be a string",
          })),
        timestamp: z.optional(z.string().datetime({ message: "Invalid datetime string: must be UTC" })),
        sets: z.object({
            create: z.array(
                z.object({
                    exerciseId: z.string({
                        required_error: "exerciseId is required",
                        invalid_type_error: "exerciseId must be an uuid",
                      }),
                    weight: z.optional(z.number({
                        invalid_type_error: "Weight must be a number",
                      }).positive()),
                    reps: z.number({
                        required_error: "Reps is required",
                        invalid_type_error: "Reps must be a number",
                      }).positive()
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