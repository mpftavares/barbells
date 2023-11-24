import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export async function createExercise(user: User) {
    const exercise = await prisma.exercise.create({
        data: {
            name: 'test exercise',
            equipment: 'dumbells',
            unilateral: true,
            userId: user.id
        },
    })

    return exercise
}
