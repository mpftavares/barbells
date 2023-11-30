import { Prisma, Exercise } from "@prisma/client";

export interface ExercisesRepository {
    findById(id: string): Promise<Exercise | null>
    searchByName(query: string): Promise<Exercise[]>
    create(data: Prisma.ExerciseUncheckedCreateInput): Promise<Exercise>
    delete(id: string): Promise<boolean>
    update(id: string, data: Prisma.ExerciseUncheckedUpdateInput): Promise<Exercise | null>

}