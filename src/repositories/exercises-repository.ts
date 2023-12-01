import { Prisma, Exercise, Muscle } from "@prisma/client";

export interface ExercisesRepository {
    findById(id: string): Promise<Exercise | null>
    searchByName(query: string, userId: string): Promise<Exercise[]>
    searchByTarget (query: Muscle, userId: string): Promise<Exercise[]>
    create(data: Prisma.ExerciseUncheckedCreateInput): Promise<Exercise>
    delete(id: string): Promise<boolean>
    update(id: string, data: Prisma.ExerciseUncheckedUpdateInput): Promise<Exercise | null>

}