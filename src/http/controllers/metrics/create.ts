import { makeCreateMetricUseCase } from "@/use-cases/factories/metrics/make-create-metric-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createMetric(request: FastifyRequest, reply: FastifyReply) {

    const createMetricParamsSchema = z.object({
        timestamp: z.optional(z.string().datetime({ message: "Invalid datetime string: must be UTC" })),
        weight: z.optional(z.number({
            invalid_type_error: "Weight must be a number",
          }).positive()),
        bodyFat: z.optional(z.number({
            invalid_type_error: "bodyFat must be a number",
          }).positive()),
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