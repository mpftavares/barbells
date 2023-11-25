import { makeGetSchemaUseCase } from '@/use-cases/factories/schemas/make-get-schema-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getSchema(request: FastifyRequest<{ Params: { schemaId: string } }>, reply: FastifyReply) {
  const getSchema = makeGetSchemaUseCase()

  const { schema } = await getSchema.execute({
    schemaId: request.params.schemaId
  })

  return reply.status(200).send({
    schema,
  })
}
