import { makeUserWorkoutsByDateUseCase } from '@/use-cases/factories/workouts/make-user-workouts-by-date'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function dateSearch(request: FastifyRequest<{ Params: { startDate: Date, endDate: Date } }>, reply: FastifyReply) {

    const userWorkoutsByDateUseCase = makeUserWorkoutsByDateUseCase()

    const { workouts } = await userWorkoutsByDateUseCase.execute({
        userId: request.user.sub,
        startDate: request.params.startDate,
        endDate: request.params.endDate
    })

    return reply.status(200).send({
        workouts,
    })
}
