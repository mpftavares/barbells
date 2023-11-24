import { PrismaMetricsRepository } from '@/repositories/prisma/prisma-metrics-repository'
import { GetMetricUseCase } from '../../metrics/metric'

export function makeGetMetricUseCase() {
    const metricsRepository = new PrismaMetricsRepository()
    const getMetricUseCase = new GetMetricUseCase(metricsRepository)

    return getMetricUseCase
}
