import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export async function createMetric(user: User) {
    const exercise = await prisma.metric.create({
        data: {
            userId: user.id,
            timestamp: new Date(),
            weight: 75,
            bodyFat: 25,
        },
    })

    return exercise
}
