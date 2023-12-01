
import { makeDeleteUserMetricsHistoryUseCase } from '@/use-cases/factories/metrics/make-delete-metric-history-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function deleteMetricHistory(request: FastifyRequest, reply: FastifyReply) {
    try {
        const deleteMetricsHistoryUseCase = makeDeleteUserMetricsHistoryUseCase();

        const isDeleted = await deleteMetricsHistoryUseCase.execute({
            userId: request.user.sub,
        });

        if (isDeleted.success) {
            return reply.status(200).send({ message: 'All user metrics deleted successfully 👌' });
        } else {
            return reply.status(404).send({ message: 'User metrics not found or already deleted 🤷' });
        }
    } catch (error) {
        console.error('Error deleting user metrics history:', error);
        return reply.status(500).send({ message: 'Internal server error' });
    }
}