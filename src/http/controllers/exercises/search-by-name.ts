
import { makeSearchExerciseUseCase } from '@/use-cases/factories/exercises/make-search-exercise-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchExercisesByName(request: FastifyRequest, reply: FastifyReply) {
  const searchExercisesByNameQuerySchema = z.object({
    query: z.string(),
  })

  const { query } = searchExercisesByNameQuerySchema.parse(request.query)

  const searchExercisesByNameUseCase = makeSearchExerciseUseCase()

  const { exercises } = await searchExercisesByNameUseCase.execute({
    query
  })

  return reply.status(200).send({
    exercises,
  })
}
