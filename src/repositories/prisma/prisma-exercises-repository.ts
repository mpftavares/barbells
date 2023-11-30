import { prisma } from "@/lib/prisma";
import { $Enums, Prisma } from "@prisma/client";
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

  async searchByName(query: string) {
    const exercises = await prisma.exercise.findMany({
      where: {
        name: {
          contains: query,
        },
      }
    })

    return exercises
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