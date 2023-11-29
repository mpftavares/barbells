import { MetricsRepository } from '@/repositories/metrics-repository'
import { Metric } from '@prisma/client'

interface FetchUserMetricsHistoryUseCaseRequest {
  userId: string
}

interface FetchUserMetricsHistoryUseCaseResponse {
  metrics: Metric[]
}

export class FetchUserMetricsHistoryUseCase {
  constructor(private metricsRepository: MetricsRepository) { }

  async execute({
    userId,
  }: FetchUserMetricsHistoryUseCaseRequest): Promise<FetchUserMetricsHistoryUseCaseResponse> {
    const metrics = await this.metricsRepository.findByUser(
      userId,
    )

    return {
      metrics,
    }
  }
}
