import { prisma } from "@/lib/prisma";
import { Muscle, Prisma } from "@prisma/client";
import { ExercisesRepository } from "../exercises-repository";

export class PrismaExercisesRepository implements ExercisesRepository {

  async findById(id: string) {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id,
      },
      include: {
        targets: true,
      },
    })

    return exercise
  }

  async searchByName(query: string, userId: string) {
    const exercises = await prisma.exercise.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                userId
              },
              {
                userId: null,
              },
            ],
          },
          {
            name: {
              contains: query,
            },
          },
        ],
      },
    });

    return exercises;
  }

  async searchByTarget(query: Muscle, userId: string) {
    const exercises = await prisma.exercise.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                userId
              },
              {
                userId: null,
              },
            ],
          },
          {
            targets: {
              some: {
                muscle: query,
              },
            },
          },
        ],
      },

    });

    return exercises;
  }

  async create(data: Prisma.ExerciseUncheckedCreateInput) {
    const exercise = await prisma.exercise.create({
      data
    });

    return exercise;
  }

  async delete(id: string) {

    const deletedExercise = await prisma.exercise.delete({
      where: {
        id,
      },
    });

    if (deletedExercise) {
      return true;
    }

    return false;
  }

  async update(id: string, data: Prisma.ExerciseUpdateInput) {

    const exercise = await prisma.exercise.update({
      data,
      where: {
        id,
      },
    })

    return exercise;
  }
}