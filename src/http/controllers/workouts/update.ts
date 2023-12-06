import { verifyPermission } from "@/http/middlewares/verify-permission";
import { makeGetWorkoutUseCase } from "@/use-cases/factories/workouts/make-get-workout-use-case";
import { makeUpdateWorkoutUseCase } from "@/use-cases/factories/workouts/make-update-workout-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateWorkout(request: FastifyRequest<{ Params: { workoutId: string } }>, reply: FastifyReply) {

    const updateWorkoutParamsSchema = z.object({
        name: z.optional(z.string({
            invalid_type_error: "Name must be a string",
          })),
        timestamp: z.optional(z.string().datetime({ message: "Invalid datetime string: must be UTC." }))
    })

    const { name, timestamp } = updateWorkoutParamsSchema.parse(request.body)

    const id = request.params.workoutId    

    const getWorkout = makeGetWorkoutUseCase()

    const { workout } = await getWorkout.execute({
        workoutId: id,
    })

    verifyPermission(workout.userId, request, reply)

    const updateWorkoutUseCase = makeUpdateWorkoutUseCase()

    await updateWorkoutUseCase.execute({
        id,
        name,
        timestamp,
    })
    return reply.status(204).send();
}