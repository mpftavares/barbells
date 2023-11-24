import { InMemoryMetricsRepository } from "../../repositories/in-memory/in-memory-metrics-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteMetricUseCase } from "./delete";

let metricsRepository: InMemoryMetricsRepository
let sut: DeleteMetricUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        metricsRepository = new InMemoryMetricsRepository()
        sut = new DeleteMetricUseCase(metricsRepository)
    })

    it('should be able to delete metric', async () => {
        const metricToDelete = await metricsRepository.create({
            userId: 'user-01',
            timestamp: undefined,
            weight: 75,
            bodyFat: 25,
        })

        const isMetricDeleted = await sut.execute({ metricId: metricToDelete.id });
        expect(isMetricDeleted.success).toBe(true);

        const deletedMetric = await metricsRepository.findById(metricToDelete.id);
        expect(deletedMetric).toBeNull();
    });
});