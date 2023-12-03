import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { WorkoutsRepository } from "../workouts-repository";

export class PrismaWorkoutsRepository implements WorkoutsRepository {

  async findByUserId(userId: string) {
    const workouts = await prisma.workout.findMany({
      where: {
        userId,
      },
      orderBy: {
        timestamp: 'desc',
      },
    })

    return workouts
  }

  async countByUserId(userId: string) {
    const count = await prisma.workout.count({
      where: {
        userId,
      },
    })

    return count
  }

  async findById(id: string) {
    const workout = await prisma.workout.findUnique({
      where: {
        id,
      },
      include: {
        sets: true,
      },
    })

    return workout
  }

  async findByDateRange(userId: string, startDate: Date, endDate: Date) {

    const workouts = await prisma.workout.findMany({
      where: {
        userId,
        timestamp: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        }
      },
    })

    return workouts
  }

  async create(data: Prisma.WorkoutUncheckedCreateInput) {
    const workout = await prisma.workout.create({
      data,
    })

    return workout
  }

  async delete(id: string) {

    const deletedWorkout = await prisma.workout.delete({
      where: {
        id,
      },
    });

    if (deletedWorkout) {
      return true;
    }

    return false;
  }

  async deleteAll(ids: string[]) {
    const deleteResult = await prisma.workout.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
    if (deleteResult.count === ids.length) {
      return true;
    }

    return false;
  }

  async update(id: string, data: Prisma.WorkoutUpdateInput) {

    const workout = await prisma.workout.update({
      data,
      where: {
        id,
      },
    })

    return workout;
  }
}