import { makeUserWorkoutsHistoryUseCase } from '@/use-cases/factories/workouts/make-user-workout-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function workoutHistory(request: FastifyRequest, reply: FastifyReply) {

    const userWorkoutsHistoryUseCase = makeUserWorkoutsHistoryUseCase()

    const { workouts } = await userWorkoutsHistoryUseCase.execute({
        userId: request.user.sub,
    })

    return reply.status(200).send({
        workouts,
    })
}
