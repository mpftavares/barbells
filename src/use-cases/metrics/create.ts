import { MetricsRepository } from "@/repositories/metrics-repository"
import { Metric } from "@prisma/client"

interface CreateMetricUseCaseRequest {
    userId: string
    timestamp?: string | undefined
    weight?: number
    bodyFat?: number
}

interface CreateMetricUseCaseResponse {
    metric: Metric
}

export class CreateMetricUseCase {

    constructor(private metricsRepository: MetricsRepository) { }

    async execute({
        userId,
        timestamp,
        weight,
        bodyFat
    }: CreateMetricUseCaseRequest): Promise<CreateMetricUseCaseResponse> {

        const metric = await this.metricsRepository.create({
            userId,
            timestamp,
            weight,
            bodyFat
        })

        if (!metric) {
            throw new Error('Failed to create metric 🤦');
        }

        return { metric }
    }
}