import { verifyAccess } from '@/http/middlewares/verify-access'
import { makeGetTemplateUseCase } from '@/use-cases/factories/templates/make-get-template-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getTemplate(request: FastifyRequest<{ Params: { templateId: string } }>, reply: FastifyReply) {
  const getTemplate = makeGetTemplateUseCase()

  const { template } = await getTemplate.execute({
    templateId: request.params.templateId
  })

  verifyAccess(template.userId, request, reply)

  return reply.status(200).send({
    template,
  })
}
