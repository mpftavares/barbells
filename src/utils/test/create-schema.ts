import { prisma } from '@/lib/prisma'
import { Exercise, Template } from '@prisma/client'

export async function createSchema(template: Template, exercise: Exercise) {
    const schema = await prisma.schema.create({
        data: {
            templateId: template.id,
            exerciseId: exercise.id,
            sets: 3,
            reps: '8-12'
        },
    })

    return schema
}
