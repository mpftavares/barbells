import { MetricsRepository } from "@/repositories/metrics-repository";
import { Metric } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetMetricUseCaseRequest {
    metricId: string
}

interface GetMetricUseCaseResponse {
    metric: Metric
}

export class GetMetricUseCase {

    constructor(private metricsRepository: MetricsRepository) { }

    async execute({
        metricId
    }: GetMetricUseCaseRequest): Promise<GetMetricUseCaseResponse> {

        const metric = await this.metricsRepository.findById(metricId);

        if (!metric) {
            throw new ResourceNotFoundError();
        }

        return {
            metric,
        };
    }
}
