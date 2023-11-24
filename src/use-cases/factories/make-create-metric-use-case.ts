import { PrismaMetricsRepository } from "@/repositories/prisma/prisma-metrics-repository"
import { CreateMetricUseCase } from "../metrics/create"

export function makeCreateMetricUseCase() {
    const metricsRepository = new PrismaMetricsRepository()
    const makeCreateMetricsUseCase = new CreateMetricUseCase(metricsRepository)

    return makeCreateMetricsUseCase
}