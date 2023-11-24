import { PrismaMetricsRepository } from "@/repositories/prisma/prisma-metrics-repository"
import { UpdateMetricUseCase } from "../metrics/update"

export function makeUpdateMetricUseCase() {
    const usersRepository = new PrismaMetricsRepository()
    const updateMetricUseCase = new UpdateMetricUseCase(usersRepository)

    return updateMetricUseCase
}
