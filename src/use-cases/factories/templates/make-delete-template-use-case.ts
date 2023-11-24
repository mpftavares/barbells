import { PrismaTemplatesRepository } from '@/repositories/prisma/prisma-templates-repository'
import { DeleteTemplateUseCase } from '../../templates/delete'

export function makeDeleteTemplateUseCase() {
  const templatesRepository = new PrismaTemplatesRepository()
  const deleteTemplateUseCase = new DeleteTemplateUseCase(templatesRepository)

  return deleteTemplateUseCase
}
