import { prisma } from "@/lib/prisma";
import { Set } from "@prisma/client";

export async function calculateWorkoutVolume(sets: Array<Set>, muscle?: string) {

    let volume = 0;

    for (const set of sets) {
        if (set.weight !== null) {
            const { exerciseId } = set;

            const exercise = await prisma.exercise.findFirstOrThrow({
                where: { id: exerciseId },
                include: { targets: true },
            });

            const { targets, equipment } = exercise;


            if (equipment !== 'assisted') {
                if (!muscle || targets.some(target => muscle.includes(target.muscle))) {
                    if (exercise.unilateral) {
                        volume += (set.reps * set.weight) * 2;
                    } else {
                        volume += set.reps * set.weight;
                    }
                }
            }
        }
    }

    return volume;
}
