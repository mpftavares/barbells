import { prisma } from "@/lib/prisma";
import { Set } from "@prisma/client";

export async function calculateWorkoutVolume(sets: Array<Set>) {

    let volume = 0

    for (const set of sets) {
        if (set.weight !== null) {
            const { exerciseId } = set;

            const exercise = await prisma.exercise.findFirstOrThrow({ where: { id: exerciseId } });

            if (exercise.unilateral) {
                volume += (set.reps * set.weight) * 2;
            } else {
                volume += set.reps * set.weight;
            }
        }
    }

    return volume
}