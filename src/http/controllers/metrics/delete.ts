import { makeDeleteMetricUseCase } from "@/use-cases/factories/make-delete-metric-use-case";
import { FastifyReply, FastifyRequest } from "fastify"

export async function deleteMetric(request: FastifyRequest<{ Params: { metricId: string } }>, reply: FastifyReply) {
    try {
        const deleteMetric = makeDeleteMetricUseCase();

        const isMetricDeleted = await deleteMetric.execute({
            metricId: request.params.metricId
        });

        if (isMetricDeleted.success) {
            return reply.status(200).send({ message: 'Metric deleted successfully 👌' });
        } else {
            return reply.status(404).send({ message: 'Metric not found 🤷' });
        }
    } catch (error) {
        console.error("Error deleting metric:", error);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}