import { PrismaTemplatesRepository } from "@/repositories/prisma/prisma-templates-repository"
import { UpdateTemplateUseCase } from "../../templates/update"

export function makeUpdateTemplateUseCase() {
  const usersRepository = new PrismaTemplatesRepository()
  const updateTemplateUseCase = new UpdateTemplateUseCase(usersRepository)

  return updateTemplateUseCase
}
