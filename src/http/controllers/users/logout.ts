import { FastifyReply, FastifyRequest } from 'fastify'

export async function logout(request: FastifyRequest, reply: FastifyReply) {

    reply.clearCookie('refreshToken', {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
    })

    return reply.status(200).send({ message: 'Logged out successfully' })
}