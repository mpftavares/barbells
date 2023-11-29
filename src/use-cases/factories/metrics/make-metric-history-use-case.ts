import { PrismaMetricsRepository } from "@/repositories/prisma/prisma-metrics-repository"
import { FetchUserMetricsHistoryUseCase } from "@/use-cases/metrics/history"

export function makeFetchUserMetricsHistoryUseCase() {
    const metricsRepository = new PrismaMetricsRepository()
    const fetchUserMetricsHistoryUseCase = new FetchUserMetricsHistoryUseCase(metricsRepository)

    return fetchUserMetricsHistoryUseCase
}
