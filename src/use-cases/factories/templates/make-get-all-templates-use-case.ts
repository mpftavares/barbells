import { PrismaTemplatesRepository } from '@/repositories/prisma/prisma-templates-repository'
import { GetAllTemplatesUseCase } from '@/use-cases/templates/all-templates'

export function makeGetAllTemplatesUseCase() {
    const templatesRepository = new PrismaTemplatesRepository()
    const getAllTemplatesUseCase = new GetAllTemplatesUseCase(templatesRepository)

    return getAllTemplatesUseCase
}
