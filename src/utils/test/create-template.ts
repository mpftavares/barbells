import { prisma } from '@/lib/prisma'
import { Exercise, User } from '@prisma/client'

export async function createTemplate(user: User, exercise: Exercise) {
  const template = await prisma.template.create({
    data: {
      name: 'test template',
      userId: user.id,
      schemas: {
        create: [
          { exerciseId: exercise.id, number: 1, sets: 3, reps: '8-12' },
          { exerciseId: exercise.id, number: 2, sets: 3, reps: '12-15' }
        ],
      },
    },
  })

  return template
}
