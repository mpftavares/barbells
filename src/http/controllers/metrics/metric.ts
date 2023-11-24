import { makeGetMetricUseCase } from '@/use-cases/factories/make-get-metric-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getMetric(request: FastifyRequest<{ Params: { metricId: string } }>, reply: FastifyReply) {
  const getMetric = makeGetMetricUseCase()

  const { metric } = await getMetric.execute({
    metricId: request.params.metricId
  })

  return reply.status(200).send({
    metric,
  })
}
