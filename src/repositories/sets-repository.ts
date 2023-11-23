import { Prisma, Set } from '@prisma/client'

export interface SetsRepository {
  findByWorkout(workoutId: string): Promise<Set[]>
  findById(id: string): Promise<Set | null>
  create(data: Prisma.SetUncheckedCreateInput): Promise<Set>
  update(id: string, data: Prisma.SetUncheckedUpdateInput): Promise<Set | null>
  delete(id: string): Promise<boolean>
}
