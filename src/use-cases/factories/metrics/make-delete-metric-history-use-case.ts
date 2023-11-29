import { PrismaMetricsRepository } from "@/repositories/prisma/prisma-metrics-repository"
import { DeleteUserMetricsHistoryUseCase } from "@/use-cases/metrics/delete-history"

export function makeDeleteUserMetricsHistoryUseCase() {
    const metricsRepository = new PrismaMetricsRepository()
    const deleteUserMetricsHistoryUseCase = new DeleteUserMetricsHistoryUseCase(metricsRepository)

    return deleteUserMetricsHistoryUseCase
}
