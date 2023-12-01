import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { TargetsRepository } from "../targets-repository";

export class PrismaTargetsRepository implements TargetsRepository {

  async findByExercise(exerciseId: string) {
    const target = await prisma.target.findMany({
      where: {
        exerciseId,
      },
    })

    return target
  }

  // async create(data: Prisma.TargetUncheckedCreateInput) {
  //   const target = await prisma.target.create({
  //     data,
  //   })

  //   return target
  // }
}