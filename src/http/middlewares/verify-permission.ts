// to allow user to get, update or delete only it's own data

import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyPermission(item: string | null, request: FastifyRequest, reply: FastifyReply) {
    if (item !== request.user.sub) {
        return reply.status(403).send({ message: 'Unauthorized ⛔' });
    }
}