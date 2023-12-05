import { verifyPermission } from "@/http/middlewares/verify-permission";
import { makeGetMetricUseCase } from "@/use-cases/factories/metrics/make-get-metric-use-case";
import { makeUpdateMetricUseCase } from "@/use-cases/factories/metrics/make-update-metric-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateMetric(request: FastifyRequest<{ Params: { metricId: string } }>, reply: FastifyReply) {
    const updateMetricParamsSchema = z.object({
        timestamp: z.optional(z.string().datetime()),
        weight: z.optional(z.number()),
        bodyFat: z.optional(z.number()),
    })

    const { timestamp, weight, bodyFat } = updateMetricParamsSchema.parse(request.body)

    const id = request.params.metricId

    const getMetric = makeGetMetricUseCase()

    const { metric } = await getMetric.execute({
        metricId: id,
    })

    verifyPermission(metric.userId, request, reply)

    const updateMetricUseCase = makeUpdateMetricUseCase()

    await updateMetricUseCase.execute({
        id,
        timestamp,
        weight,
        bodyFat
    })
    return reply.status(204).send();
}