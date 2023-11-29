// to allow user to get it's own data or apps' default data

import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyAccess(itemUserId: string | null, request: FastifyRequest, reply: FastifyReply) {
    if (itemUserId !== request.user.sub && itemUserId !== null) {
        return reply.status(403).send({ message: 'Unauthorized ⛔' });
    }
}