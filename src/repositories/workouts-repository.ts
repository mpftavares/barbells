import { Prisma, Workout } from "@prisma/client";

export interface WorkoutsRepository {
    findByUserId(userId: string): Promise<Workout[]>
    countByUserId(userId: string): Promise<number>
    findById(id: string): Promise<Workout | null>
    findByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Workout[]>
    create(data: Prisma.WorkoutUncheckedCreateInput): Promise<Workout>
    delete(id: string): Promise<boolean>
    update(id: string, data: Prisma.WorkoutUncheckedUpdateInput): Promise<Workout | null>
    deleteAll(ids: string[]): Promise<boolean>
}