import { verifyPermission } from '@/http/middlewares/verify-permission'
import { makeGetMetricUseCase } from '@/use-cases/factories/metrics/make-get-metric-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getMetric(request: FastifyRequest<{ Params: { metricId: string } }>, reply: FastifyReply) {
  const getMetric = makeGetMetricUseCase()

  const { metric } = await getMetric.execute({
    metricId: request.params.metricId
  })

  verifyPermission(metric.userId, request, reply)

  return reply.status(200).send({
    metric,
  })
}
