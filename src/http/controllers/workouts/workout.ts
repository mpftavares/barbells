import { makeGetWorkoutUseCase } from '@/use-cases/factories/make-get-workout-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function workout(request: FastifyRequest<{ Params: { workoutId: string } }>, reply: FastifyReply) {
  const getWorkout = makeGetWorkoutUseCase()

  const { workout } = await getWorkout.execute({
    workoutId: request.params.workoutId
  })

  return reply.status(200).send({
    workout,
  })
}
