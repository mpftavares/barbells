import { Prisma, Target } from '@prisma/client'
import { TargetsRepository } from '../targets-repository'

export class InMemoryTargetsRepository implements TargetsRepository {
  public items: Target[] = []

  async findByExercise(exerciseId: string) {
    return this.items
      .filter((target) => target.exerciseId === exerciseId)
  }

  async create(data: Prisma.TargetUncheckedCreateInput) {
    const target = {
      exerciseId: data.exerciseId,
      muscle: data.muscle
    }

    this.items.push(target)

    return target
  }

}