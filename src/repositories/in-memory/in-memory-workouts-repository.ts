import { Prisma, Workout } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { WorkoutsRepository } from '../workouts-repository'

export class InMemoryWorkoutsRepository implements WorkoutsRepository {
  public items: Workout[] = []

  async findByUserId(userId: string) {
    return this.items
      .filter((workout) => workout.userId === userId)
  }

  async countByUserId(userId: string) {
    return this.items.filter((workout) => workout.userId === userId).length
  }

  async findById(id: string) {
    const workout = this.items.find((item) => item.id === id)

    if (!workout) {
      return null
    }

    return workout
  }

  async findByDateRange(userId: string, startDate: string, endDate: string) {

    const starts = new Date(startDate)
    const ends = new Date(endDate)

    ends.setDate(ends.getDate() + 1)

    return this.items.filter((workout) => {
      return workout.userId === userId &&
        workout.timestamp >= starts &&
        workout.timestamp < ends;
    });
  }

  async create(data: Prisma.WorkoutUncheckedCreateInput) {
    const workout = {
      id: randomUUID(),
      name: data.name ?? null,
      timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
      userId: data.userId,
    }

    this.items.push(workout)

    return workout
  }

  async delete(id: string) {

    const index = this.items.findIndex((item) => item.id === id)

    if (index === -1) {
      return false
    }

    this.items.splice(index, 1)
    return true

  }

  async deleteAll(ids: string[]) {
    const initialItemCount = this.items.length;

    this.items = this.items.filter((workout) => !ids.includes(workout.id));

    const finalItemCount = this.items.length;
    const deletedCount = initialItemCount - finalItemCount;

    return deletedCount === ids.length;
  }

  async update(id: string, data: Prisma.WorkoutUncheckedUpdateInput) {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const existingWorkout = this.items[index];
    const updatedWorkout = {
      ...existingWorkout,
      ...data,
    } as Workout;

    this.items[index] = updatedWorkout;

    return updatedWorkout;
  }
}
