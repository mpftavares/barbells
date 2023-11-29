import { PrismaMetricsRepository } from "@/repositories/prisma/prisma-metrics-repository"
import { UpdateMetricUseCase } from "../../metrics/update"

export function makeUpdateMetricUseCase() {
    const metricsRepository = new PrismaMetricsRepository()
    const updateMetricUseCase = new UpdateMetricUseCase(metricsRepository)

    return updateMetricUseCase
}
