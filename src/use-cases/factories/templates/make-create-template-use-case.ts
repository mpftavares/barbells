import { PrismaTemplatesRepository } from "@/repositories/prisma/prisma-templates-repository"
import { CreateTemplateUseCase } from "../../templates/create"

export function makeCreateTemplateUseCase() {
    const templatesRepository = new PrismaTemplatesRepository()
    const makeCreateTemplatesUseCase = new CreateTemplateUseCase(templatesRepository)

    return makeCreateTemplatesUseCase
}