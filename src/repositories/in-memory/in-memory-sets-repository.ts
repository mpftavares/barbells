import { Prisma, Set } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { SetsRepository } from '../sets-repository'

export class InMemorySetsRepository implements SetsRepository {
  public items: Set[] = []

  async findByWorkout(workoutId: string) {
    return this.items
      .filter((set) => set.workoutId === workoutId)
  }

  async findById(id: string) {
    const set = this.items.find((item) => item.id === id)

    if (!set) {
      return null
    }

    return set
  }

  async create(data: Prisma.SetUncheckedCreateInput) {

    const setNumber = this.items.length + 1

    const set = {
      id: randomUUID(),
      workoutId: data.workoutId,
      exerciseId: data.exerciseId,
      number: setNumber,
      weight: data.weight as Prisma.Decimal,
      reps: data.reps,
    };

    this.items.push(set);

    return set;
  }

  async delete(id: string) {

    const index = this.items.findIndex((item) => item.id === id)

    if (index === -1) {
      return false
    }

    this.items.splice(index, 1)
    return true

  }

  async update(id: string, data: Prisma.SetUncheckedUpdateInput) {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const existingSet = this.items[index];
    const updatedSet = {
      ...existingSet,
      ...data,
    } as Set;

    this.items[index] = updatedSet;

    return updatedSet;
  }
}
