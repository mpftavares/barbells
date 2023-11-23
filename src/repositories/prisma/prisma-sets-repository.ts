import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { SetsRepository } from "../sets-repository";

export class PrismaSetsRepository implements SetsRepository {

  async findByWorkout(workoutId: string) {
    const sets = await prisma.set.findMany({
      where: {
        workoutId,
      }
    })

    return sets
  }

  async findById(id: string) {
    const set = await prisma.set.findUnique({
      where: {
        id,
      },
    })

    return set
  }

  async create(data: Prisma.SetUncheckedCreateInput) {
    const set = await prisma.set.create({
      data,
    })

    return set
  }

  async delete(id: string) {
    const deletedSet = await prisma.set.delete({
      where: {
        id,
      },
    });

    if (deletedSet) {
      return true;
    }

    return false;
  }

  async update(id: string, data: Prisma.SetUpdateInput) {

    const set = await prisma.set.update({
      data,
      where: {
        id,
      },
    })

    return set;
  }
}