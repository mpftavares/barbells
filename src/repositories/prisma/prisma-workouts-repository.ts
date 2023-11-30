import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { WorkoutsRepository } from "../workouts-repository";

export class PrismaWorkoutsRepository implements WorkoutsRepository {

  async findByUser(userId: string) {
    const workouts = await prisma.workout.findMany({
      where: {
        userId,
      }
    })

    return workouts
  }

  async findById(id: string) {
    const workout = await prisma.workout.findUnique({
      where: {
        id,
      },
    })

    return workout
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