import { verifyPermission } from "@/http/middlewares/verify-permission";
import { makeDeleteMetricUseCase } from "@/use-cases/factories/metrics/make-delete-metric-use-case";
import { makeGetMetricUseCase } from "@/use-cases/factories/metrics/make-get-metric-use-case";
import { FastifyReply, FastifyRequest } from "fastify"

export async function deleteMetric(request: FastifyRequest<{ Params: { metricId: string } }>, reply: FastifyReply) {
    try {
        const deleteMetric = makeDeleteMetricUseCase();

        const metricId = request.params.metricId

        const getMetric = makeGetMetricUseCase()

        const { metric } = await getMetric.execute({
            metricId: metricId,
        })

        verifyPermission(metric.userId, request, reply)

        const isMetricDeleted = await deleteMetric.execute({
            metricId: metricId
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