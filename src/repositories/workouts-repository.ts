import { Prisma, Workout } from "@prisma/client";

export interface WorkoutsRepository {
    create(data: Prisma.WorkoutUncheckedCreateInput): Promise<Workout>
}