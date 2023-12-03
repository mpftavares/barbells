import { MetricsRepository } from '@/repositories/metrics-repository';
import { FailedToDeleteResourceError } from '../errors/failed-to-delete-resource.error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteMetricsHistoryUseCaseRequest {
  userId: string;
}

interface DeleteMetricsHistoryUseCaseResponse {
  success: boolean;
}

export class DeleteUserMetricsHistoryUseCase {
  constructor(private metricsRepository: MetricsRepository) { }

  async execute({
    userId,
  }: DeleteMetricsHistoryUseCaseRequest): Promise<DeleteMetricsHistoryUseCaseResponse> {
    const userMetrics = await this.metricsRepository.findByUserId(userId);

    if (userMetrics.length === 0) {
      throw new ResourceNotFoundError();
    }

    const metricIds = userMetrics.map((metric) => metric.id);

    const areMetricsDeleted = await this.metricsRepository.deleteAll(metricIds);

    if (!areMetricsDeleted) {
      throw new FailedToDeleteResourceError()
    }

    return {
      success: areMetricsDeleted,
    };
  }
}
