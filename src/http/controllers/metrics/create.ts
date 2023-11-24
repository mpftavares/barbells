import { makeCreateMetricUseCase } from "@/use-cases/factories/metrics/make-create-metric-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createMetric(request: FastifyRequest, reply: FastifyReply) {

    const createMetricParamsSchema = z.object({
        timestamp: z.optional(z.string().datetime()),
        weight: z.optional(z.number()),
        bodyFat: z.optional(z.number()),
    })

    const { timestamp, weight, bodyFat } = createMetricParamsSchema.parse(request.body)

    const createMetricUseCase = makeCreateMetricUseCase()

    await createMetricUseCase.execute({
        userId: request.user.sub,
        timestamp,
        weight,
        bodyFat
    })
    return reply.status(201).send();

}