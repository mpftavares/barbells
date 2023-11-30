import { MetricsRepository } from '@/repositories/metrics-repository'
import { Metric } from '@prisma/client'

interface UserMetricsHistoryUseCaseRequest {
  userId: string
}

interface UserMetricsHistoryUseCaseResponse {
  metrics: Metric[]
}

export class UserMetricsHistoryUseCase {
  constructor(private metricsRepository: MetricsRepository) { }

  async execute({
    userId,
  }: UserMetricsHistoryUseCaseRequest): Promise<UserMetricsHistoryUseCaseResponse> {
    const metrics = await this.metricsRepository.findByUserId(
      userId,
    )

    return {
      metrics,
    }
  }
}
