import { MetricsRepository } from '@/repositories/metrics-repository'
import { Metric } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateMetricUseCaseRequest {
  id: string
  timestamp?: string | undefined
  weight?: number
  bodyFat?: number
}

interface UpdateMetricUseCaseResponse {
  updatedMetric: Metric
}

export class UpdateMetricUseCase {
  constructor(private metricsRepository: MetricsRepository) { }

  async execute({
    id,
    timestamp,
    weight,
    bodyFat
  }: UpdateMetricUseCaseRequest): Promise<UpdateMetricUseCaseResponse> {

    const metricToUpdate = await this.metricsRepository.findById(id);

    if (!metricToUpdate) {
      throw new ResourceNotFoundError()
    }

    const data = {
      timestamp,
      weight,
      bodyFat
    }

    const updatedMetric = await this.metricsRepository.update(
      id,
      data
    )

    if (!updatedMetric) {
      throw new Error('Failed to update metric 🤦');
    }

    return { updatedMetric };
  }
}