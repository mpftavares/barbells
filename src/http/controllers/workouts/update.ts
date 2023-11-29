import { verifyPermission } from "@/http/middlewares/verify-permission";
import { makeGetWorkoutUseCase } from "@/use-cases/factories/workouts/make-get-workout-use-case";
import { makeUpdateWorkoutUseCase } from "@/use-cases/factories/workouts/make-update-workout-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateWorkout(request: FastifyRequest, reply: FastifyReply) {

    const updateWorkoutParamsSchema = z.object({
        id: z.string(),
        name: z.optional(z.string().nullable()),
        timestamp: z.optional(z.string().datetime())
    })

    const { id, name, timestamp } = updateWorkoutParamsSchema.parse(request.body)

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