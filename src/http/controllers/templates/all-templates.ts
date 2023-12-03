import { verifyAccess } from '@/http/middlewares/verify-access'
import { makeGetAllTemplatesUseCase } from '@/use-cases/factories/templates/make-get-all-templates-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllTemplates(request: FastifyRequest<{ Params: { templateId: string } }>, reply: FastifyReply) {

    const getAllTemplates = makeGetAllTemplatesUseCase()

    const { templates } = await getAllTemplates.execute({
        userId: request.user.sub,
    })

    return reply.status(200).send({
        templates,
    })
}
