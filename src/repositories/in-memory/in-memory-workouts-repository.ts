import { Prisma, Workout } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { WorkoutsRepository } from '../workouts-repository'

export class InMemoryWorkoutsRepository implements WorkoutsRepository {
    public items: Workout[] = []

    async findById(id: string) {
        const workout = this.items.find((item) => item.id === id)
    
        if (!workout) {
          return null
        }
    
        return workout
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
}
