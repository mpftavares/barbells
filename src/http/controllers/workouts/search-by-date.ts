import { makeSearchUserWorkoutDateUseCase } from '@/use-cases/factories/workouts/make-search-user-workouts-by-date-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function searchByDate(request: FastifyRequest<{ Params: { startDate: Date, endDate: Date } }>, reply: FastifyReply) {

    const searchUserWorkoutDateUseCase = makeSearchUserWorkoutDateUseCase()

    const { workouts } = await searchUserWorkoutDateUseCase.execute({
        userId: request.user.sub,
        startDate: request.params.startDate,
        endDate: request.params.endDate
    })

    return reply.status(200).send({
        workouts,
    })
}
