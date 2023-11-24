import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryMetricsRepository } from '@/repositories/in-memory/in-memory-metrics-repository'
import { GetMetricUseCase } from './metric'

let metricsRepository: InMemoryMetricsRepository
let sut: GetMetricUseCase

describe('Get Metric Profile Use Case', () => {
    beforeEach(() => {
        metricsRepository = new InMemoryMetricsRepository()
        sut = new GetMetricUseCase(metricsRepository)
    })

    it('should be able to get metric by id', async () => {
        const createdMetric = await metricsRepository.create({
            userId: 'user-01',
            timestamp: undefined,
            weight: 75,
            bodyFat: 25,
        })

        const { metric } = await sut.execute({ metricId: createdMetric.id })

        expect(metric.weight).toEqual(75)
    })

    it('should not be able to get metric with wrong id', async () => {
        await expect(() =>
            sut.execute({ metricId: 'non-existing-id' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
