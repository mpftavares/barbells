import { PrismaMetricsRepository } from "@/repositories/prisma/prisma-metrics-repository"
import { CreateMetricUseCase } from "../../metrics/create"

export function makeCreateMetricUseCase() {
    const metricsRepository = new PrismaMetricsRepository()
    const makeCreateMetricUseCase = new CreateMetricUseCase(metricsRepository)

    return makeCreateMetricUseCase
}