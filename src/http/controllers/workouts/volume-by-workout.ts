import { verifyAccess } from '@/http/middlewares/verify-access'
import { makeGetWorkoutUseCase } from '@/use-cases/factories/workouts/make-get-workout-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getWorkoutVolume(request: FastifyRequest<{ Params: { workoutId: string } }>, reply: FastifyReply) {

    const getWorkoutQuerySchema = z.object({
        muscle: z.optional(z.enum([
            'abs',
            'back',
            'biceps',
            'calfs',
            'chest',
            'glutes',
            'hamstrings',
            'quadriceps',
            'shoulders',
            'triceps',
        ])),
    })

    const { muscle } = getWorkoutQuerySchema.parse(request.query)

    const getWorkout = makeGetWorkoutUseCase()

    const { workout, volume } = await getWorkout.execute({
        workoutId: request.params.workoutId,
        muscle
    })

    verifyAccess(workout.userId, request, reply)

    return reply.status(200).send({
        volume
    })
}
