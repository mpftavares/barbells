import { makeUpdateMetricUseCase } from "@/use-cases/factories/make-update-metric-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateMetric(request: FastifyRequest, reply: FastifyReply) {

    const updateMetricParamsSchema = z.object({
        id: z.string(),
        timestamp: z.optional(z.string().datetime()),
        weight: z.optional(z.number()),
        bodyFat: z.optional(z.number()),
    })

    const { id, timestamp, weight, bodyFat } = updateMetricParamsSchema.parse(request.body)

    const updateMetricUseCase = makeUpdateMetricUseCase()

    await updateMetricUseCase.execute({
        id,
        timestamp,
        weight,
        bodyFat
    })
    return reply.status(204).send();
}