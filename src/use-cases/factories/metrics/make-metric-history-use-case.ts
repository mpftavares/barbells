import { PrismaMetricsRepository } from "@/repositories/prisma/prisma-metrics-repository"
import { UserMetricsHistoryUseCase } from "@/use-cases/metrics/history"

export function makeUserMetricsHistoryUseCase() {
    const metricsRepository = new PrismaMetricsRepository()
    const userMetricsHistoryUseCase = new UserMetricsHistoryUseCase(metricsRepository)

    return userMetricsHistoryUseCase
}
