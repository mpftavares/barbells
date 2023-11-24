import { PrismaMetricsRepository } from '@/repositories/prisma/prisma-metrics-repository'
import { DeleteMetricUseCase } from '../metrics/delete'

export function makeDeleteMetricUseCase() {
    const metricsRepository = new PrismaMetricsRepository()
    const deleteMetricUseCase = new DeleteMetricUseCase(metricsRepository)

    return deleteMetricUseCase
}
