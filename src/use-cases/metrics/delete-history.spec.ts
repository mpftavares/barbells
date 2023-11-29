import { InMemoryMetricsRepository } from '@/repositories/in-memory/in-memory-metrics-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteUserMetricsHistoryUseCase } from './delete-history';



let metricsRepository: InMemoryMetricsRepository;
let sut: DeleteUserMetricsHistoryUseCase;

describe('Delete User Metrics History Use Case', () => {
    beforeEach(() => {
        metricsRepository = new InMemoryMetricsRepository();
        sut = new DeleteUserMetricsHistoryUseCase(metricsRepository);
    });

    it('should be able to delete all user metrics', async () => {

        await metricsRepository.create({
            userId: 'user-01',
            timestamp: undefined,
            weight: 75,
            bodyFat: 25,
        });

        await metricsRepository.create({
            userId: 'user-01',
            timestamp: undefined,
            weight: 70,
            bodyFat: 20,
        });

        const isDeleted = await sut.execute({ userId: 'user-01' });

        expect(isDeleted.success).toBe(true);

        const metrics = await metricsRepository.findByUser('user-01');

        expect(metrics).toHaveLength(0);
    });
});
