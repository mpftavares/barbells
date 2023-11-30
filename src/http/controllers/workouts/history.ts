import { makeFetchUserWorkoutsHistoryUseCase } from '@/use-cases/factories/workouts/make-workout-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function workoutHistory(request: FastifyRequest, reply: FastifyReply) {

    const fetchUserWorkoutsHistoryUseCase = makeFetchUserWorkoutsHistoryUseCase()

    const { workouts } = await fetchUserWorkoutsHistoryUseCase.execute({
        userId: request.user.sub,
    })

    return reply.status(200).send({
        workouts,
    })
}
