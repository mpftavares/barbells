import { Prisma, Target } from "@prisma/client";

export interface TargetsRepository {
    findByExercise(exerciseId: string): Promise<Target[]>
    // create(data: Prisma.TargetUncheckedCreateInput): Promise<Target>
}