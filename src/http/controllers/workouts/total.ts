import { makeUserWorkoutTotalUseCase } from '@/use-cases/factories/workouts/make-user-workout-total-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function workoutTotal(request: FastifyRequest, reply: FastifyReply) {

    const userWorkoutTotalUseCase = makeUserWorkoutTotalUseCase()

    const { count } = await userWorkoutTotalUseCase.execute({
        userId: request.user.sub,
    })

    return reply.status(200).send({
        count
    })
}
