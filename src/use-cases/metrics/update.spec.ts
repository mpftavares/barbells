import { InMemoryMetricsRepository } from "@/repositories/in-memory/in-memory-metrics-repository";
import { beforeEach, expect, it } from "vitest";
import { UpdateMetricUseCase } from "./update";

let metricsRepository: InMemoryMetricsRepository;
let sut: UpdateMetricUseCase;

beforeEach(() => {
    metricsRepository = new InMemoryMetricsRepository();
    sut = new UpdateMetricUseCase(metricsRepository);
});

it('should update body weight', async () => {

    const metricToUpdate = await metricsRepository.create({
        userId: 'user-01',
        timestamp: undefined,
        weight: 75,
        bodyFat: 25,
    });

    const { updatedMetric } = await sut.execute({
        id: metricToUpdate.id,
        weight: 72,
    });

    expect(updatedMetric).toBeDefined();
    expect(updatedMetric.id).toBe(metricToUpdate.id);
    expect(updatedMetric.weight).toBe(72);
});

it('should update metric timestamp', async () => {

    const metricToUpdate = await metricsRepository.create({
        userId: 'user-01',
        timestamp: undefined,
        weight: 75,
        bodyFat: 25,
    });

    const updatedTimestamp = new Date().toISOString()

    const { updatedMetric } = await sut.execute({
        id: metricToUpdate.id,
        timestamp: updatedTimestamp
    });

    expect(updatedMetric).toBeDefined();
    expect(updatedMetric.id).toBe(metricToUpdate.id);
    expect(updatedMetric.timestamp).toEqual(updatedTimestamp);
});
