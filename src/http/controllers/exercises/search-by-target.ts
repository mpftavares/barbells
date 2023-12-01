
import { makeSearchExerciseUseCase } from '@/use-cases/factories/exercises/make-search-exercises-by-target-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchExercisesByTarget(request: FastifyRequest, reply: FastifyReply) {
  const searchExercisesByTargetQuerySchema = z.object({
    query: z.enum([
      'abs',
      'back',
      'biceps',
      'calfs',
      'chest',
      'glutes',
      'hamstrings',
      'quadriceps',
      'shoulders',
      'triceps',
  ]),
  })

  const { query } = searchExercisesByTargetQuerySchema.parse(request.query)

  const searchExercisesByTargetUseCase = makeSearchExerciseUseCase()

  const { exercises } = await searchExercisesByTargetUseCase.execute({
    query,
    userId: request.user.sub
  })

  return reply.status(200).send({
    exercises,
  })
}
