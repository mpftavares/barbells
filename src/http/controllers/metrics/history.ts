import { makeFetchUserMetricsHistoryUseCase } from '@/use-cases/factories/metrics/make-metric-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metricHistory(request: FastifyRequest, reply: FastifyReply) {

    const fetchUserMetricsHistoryUseCase = makeFetchUserMetricsHistoryUseCase()

    const { metrics } = await fetchUserMetricsHistoryUseCase.execute({
        userId: request.user.sub,
    })

    return reply.status(200).send({
        metrics,
    })
}
