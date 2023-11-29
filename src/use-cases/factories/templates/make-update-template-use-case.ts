import { PrismaTemplatesRepository } from "@/repositories/prisma/prisma-templates-repository"
import { UpdateTemplateUseCase } from "../../templates/update"

export function makeUpdateTemplateUseCase() {
  const templatesRepository = new PrismaTemplatesRepository()
  const updateTemplateUseCase = new UpdateTemplateUseCase(templatesRepository)

  return updateTemplateUseCase
}
