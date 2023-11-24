import { InMemoryMetricsRepository } from '@/repositories/in-memory/in-memory-metrics-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateMetricUseCase } from './create'

let metricsRepository: InMemoryMetricsRepository
let sut: CreateMetricUseCase

describe('Create Metric Use Case', () => {
  beforeEach(() => {
    metricsRepository = new InMemoryMetricsRepository()
    sut = new CreateMetricUseCase(metricsRepository)
  })

  it('should be able to create a metric not providing a timestamp input', async () => {
    const { metric } = await sut.execute({
      userId: 'user-01',
      timestamp: undefined,
      weight: 75,
      bodyFat: 25,
    })

    expect(metric.timestamp).toEqual(expect.any(Date))
  })

  it('should be able to create a metric providing a timestamp input', async () => {
    const { metric } = await sut.execute({
      userId: 'user-01',
      timestamp: new Date().toISOString(),
      bodyFat: 25,
    })

    expect(metric.timestamp).toEqual(expect.any(Date))
  })
})
