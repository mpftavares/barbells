import { PrismaTemplatesRepository } from '@/repositories/prisma/prisma-templates-repository'
import { GetTemplateUseCase } from '../../templates/template'

export function makeGetTemplateUseCase() {
  const templatesRepository = new PrismaTemplatesRepository()
  const getTemplateUseCase = new GetTemplateUseCase(templatesRepository)

  return getTemplateUseCase
}
