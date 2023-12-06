import { FastifyReply, FastifyRequest } from 'fastify'

export async function logout(request: FastifyRequest, reply: FastifyReply) {

    try {
        reply.clearCookie('refreshToken', {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true,
        })

        return reply.status(200).send({ message: 'Logged out successfully ✌️' });
    }

    catch {
        return reply.status(500).send({ message: 'Error logging out 🤷' })
    }
}