import { Prisma, Workout } from "@prisma/client";

export interface WorkoutsRepository {
    findByUser(userId: string): Promise<Workout[]>
    findById(id: string): Promise<Workout | null>
    create(data: Prisma.WorkoutUncheckedCreateInput): Promise<Workout>
    delete(id: string): Promise<boolean>
    update(id: string, data: Prisma.WorkoutUncheckedUpdateInput): Promise<Workout | null>

}