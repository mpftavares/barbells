import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { WorkoutsRepository } from "../workouts-repository";

export class PrismaWorkoutsRepository implements WorkoutsRepository {

    async create(data: Prisma.WorkoutUncheckedCreateInput) {
        const workout = await prisma.workout.create({ data })

        return workout
    }

}