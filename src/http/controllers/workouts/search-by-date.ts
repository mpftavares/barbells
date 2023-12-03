import { makeSearchWorkoutsByDateUseCase } from '@/use-cases/factories/workouts/make-search-user-workouts-by-date-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchByDate(request: FastifyRequest, reply: FastifyReply) {

    const searchWorkoutsByDateQuerySchema = z.object({
        from: z.string(),
        to: z.string(),
    })

    const { from, to } = searchWorkoutsByDateQuerySchema.parse(request.query)

    const searchUserWorkoutsByDateUseCase = makeSearchWorkoutsByDateUseCase()

    const { workouts } = await searchUserWorkoutsByDateUseCase.execute({
        userId: request.user.sub,
        startDate: from,
        endDate: to
    })

    return reply.status(200).send({
        workouts
    })
}
