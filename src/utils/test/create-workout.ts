import { prisma } from '@/lib/prisma'
import { Exercise, User } from '@prisma/client'

export async function createWorkout(user: User, exercise: Exercise) {
  const workout = await prisma.workout.create({
    data: {
      name: 'test workout',
      timestamp: new Date(),
      userId: user.id,
      sets: {
        create: [
          { number: 1, exerciseId: exercise.id, reps: 10, weight: 10 },
          { number: 2, exerciseId: exercise.id, reps: 10, weight: 10 },
          { number: 3, exerciseId: exercise.id, reps: 10, weight: 10 },
        ]
      }
    },
  })

  return workout
}
