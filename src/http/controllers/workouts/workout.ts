import { verifyAccess } from '@/http/middlewares/verify-access'
import { makeGetWorkoutUseCase } from '@/use-cases/factories/workouts/make-get-workout-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getWorkout(request: FastifyRequest<{ Params: { workoutId: string } }>, reply: FastifyReply) {
  const getWorkout = makeGetWorkoutUseCase()

  const { workout } = await getWorkout.execute({
    workoutId: request.params.workoutId
  })

  verifyAccess(workout.userId, request, reply)

  return reply.status(200).send({
    workout,
  })
}
