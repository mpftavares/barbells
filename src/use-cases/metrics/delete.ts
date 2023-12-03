import { MetricsRepository } from "@/repositories/metrics-repository";
import { FailedToDeleteResourceError } from "../errors/failed-to-delete-resource.error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteMetricUseCaseRequest {
    metricId: string
}

interface DeleteMetricUseCaseResponse {
    success: boolean
}

export class DeleteMetricUseCase {

    constructor(private metricsRepository: MetricsRepository) { }

    async execute({
        metricId
    }: DeleteMetricUseCaseRequest): Promise<DeleteMetricUseCaseResponse> {
        const metric = await this.metricsRepository.findById(metricId);

        if (!metric) {
            throw new ResourceNotFoundError();
        }

        const isMetricDeleted = await this.metricsRepository.delete(metricId);

        if (!isMetricDeleted) {
            throw new FailedToDeleteResourceError()
        }

        return {
            success: isMetricDeleted,
        };
    }
}
