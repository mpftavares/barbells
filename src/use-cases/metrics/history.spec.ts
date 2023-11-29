import { InMemoryMetricsRepository } from '@/repositories/in-memory/in-memory-metrics-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserMetricsHistoryUseCase } from './history'


let metricsRepository: InMemoryMetricsRepository
let sut: FetchUserMetricsHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {
    beforeEach(async () => {
        metricsRepository = new InMemoryMetricsRepository()
        sut = new FetchUserMetricsHistoryUseCase(metricsRepository)
    })

    it('should be able to fetch check-in history', async () => {
        await metricsRepository.create({
            userId: 'user-01',
            timestamp: undefined,
            weight: 75,
            bodyFat: 25,
        })

        await metricsRepository.create({
            userId: 'user-01',
            timestamp: undefined,
            weight: 70,
            bodyFat: 20,
        })

        const { metrics } = await sut.execute({
            userId: 'user-01',
        })

        expect(metrics).toHaveLength(2)
        expect(metrics).toEqual([
            expect.objectContaining({ weight: 75 }),
            expect.objectContaining({ bodyFat: 20 }),
        ])
    })
})
