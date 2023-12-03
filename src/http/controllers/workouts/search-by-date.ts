import { makeSearchWorkoutsByDateUseCase } from '@/use-cases/factories/workouts/make-search-user-workouts-by-date-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchByDate(request: FastifyRequest, reply: FastifyReply) {

    const searchWorkoutsByDateQuerySchema = z.object({
        from: z.string(),
        to: z.string(),
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

    const { from, to, muscle } = searchWorkoutsByDateQuerySchema.parse(request.query)

    const searchUserWorkoutsByDateUseCase = makeSearchWorkoutsByDateUseCase()

    const { workouts, volume } = await searchUserWorkoutsByDateUseCase.execute({
        userId: request.user.sub,
        startDate: from,
        endDate: to,
        muscle
    })

    return reply.status(200).send({
        workouts, volume
    })
}
