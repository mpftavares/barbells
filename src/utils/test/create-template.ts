import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export async function createTemplate(user: User) {
    const template = await prisma.template.create({
        data: {
            name: 'test template',
            userId: user.id,
        },
    })

    return template
}
