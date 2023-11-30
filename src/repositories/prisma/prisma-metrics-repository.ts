import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { MetricsRepository } from "../metrics-repository";

export class PrismaMetricsRepository implements MetricsRepository {

  async findByUserId(userId: string) {
    const metrics = await prisma.metric.findMany({
      where: {
        userId,
      }
    })

    return metrics
  }

  async findById(id: string) {
    const metric = await prisma.metric.findUnique({
      where: {
        id,
      },
    })

    return metric
  }

  async create(data: Prisma.MetricUncheckedCreateInput) {
    const metric = await prisma.metric.create({
      data,
    })

    return metric
  }

  async delete(id: string) {
    const deletedMetric = await prisma.metric.delete({
      where: {
        id,
      },
    });

    if (deletedMetric) {
      return true;
    }

    return false;
  }

  async deleteAll(ids: string[]) {
    const deleteResult = await prisma.metric.deleteMany({
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

  async update(id: string, data: Prisma.MetricUpdateInput) {

    const metric = await prisma.metric.update({
      data,
      where: {
        id,
      },
    })

    return metric;
  }
}