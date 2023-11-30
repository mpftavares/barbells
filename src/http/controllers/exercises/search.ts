
import { makeSearchExerciseUseCase } from '@/use-cases/factories/exercises/make-search-exercise-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchExercises(request: FastifyRequest, reply: FastifyReply) {
  const searchExercisesQuerySchema = z.object({
    query: z.string(),
  })

  const { query } = searchExercisesQuerySchema.parse(request.query)

  const searchExercisesUseCase = makeSearchExerciseUseCase()

  const { exercises } = await searchExercisesUseCase.execute({
    query
  })

  return reply.status(200).send({
    exercises,
  })
}
