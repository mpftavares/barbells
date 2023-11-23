import { makeGetSetUseCase } from '@/use-cases/factories/make-get-set-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getSet(request: FastifyRequest<{ Params: { setId: string } }>, reply: FastifyReply) {
  const getSet = makeGetSetUseCase()

  const { set } = await getSet.execute({
    setId: request.params.setId
  })

  return reply.status(200).send({
    set,
  })
}
