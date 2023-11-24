import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export async function createWorkout(user: User) {
    const workout = await prisma.workout.create({
        data: {
            name: 'test workout',
            timestamp: new Date(),
            userId: user.id,
        },
    })

    return workout
}
