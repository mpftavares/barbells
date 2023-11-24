import { prisma } from '@/lib/prisma'
import { Exercise, Workout } from '@prisma/client'

export async function createSet(workout: Workout, exercise: Exercise) {
    const set = await prisma.set.create({
        data: {
            workoutId: workout.id,
            exerciseId: exercise.id,
            weight: 100,
            reps: 10,
        },
    })

    return set
}
