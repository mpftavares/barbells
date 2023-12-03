import { verifyAccess } from '@/http/middlewares/verify-access'
import { makeGetAllExercisesUseCase } from '@/use-cases/factories/exercises/make-get-all-exercises-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllExercises(request: FastifyRequest<{ Params: { exerciseId: string } }>, reply: FastifyReply) {

    const getAllExercises = makeGetAllExercisesUseCase()

    const { exercises } = await getAllExercises.execute({
        userId: request.user.sub,
    })

    return reply.status(200).send({
        exercises,
    })
}
