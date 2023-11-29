import { verifyAccess } from '@/http/middlewares/verify-access'
import { makeGetExerciseUseCase } from '@/use-cases/factories/exercises/make-get-exercise-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getExercise(request: FastifyRequest<{ Params: { exerciseId: string } }>, reply: FastifyReply) {

  const getExercise = makeGetExerciseUseCase()

  const { exercise } = await getExercise.execute({
    exerciseId: request.params.exerciseId,
  })

  verifyAccess(exercise.userId, request, reply)

  return reply.status(200).send({
    exercise,
  })
}
