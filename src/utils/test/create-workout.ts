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
          { exerciseId: exercise.id, reps: 12 },
          { exerciseId: exercise.id, reps: 10 },
          { exerciseId: exercise.id, reps: 8 },
        ]
      }
    },
  })

  return workout
}
