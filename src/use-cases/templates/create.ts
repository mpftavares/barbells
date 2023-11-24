import { TemplatesRepository } from "@/repositories/templates-repository"
import { Template } from "@prisma/client"

interface CreateTemplateUseCaseRequest {
    userId: string
    name: string
}

interface CreateTemplateUseCaseResponse {
    template: Template
}

export class CreateTemplateUseCase {

    constructor(private templatesRepository: TemplatesRepository) { }

    async execute({
        userId,
        name
    }: CreateTemplateUseCaseRequest): Promise<CreateTemplateUseCaseResponse> {

        const template = await this.templatesRepository.create({
            userId,
            name,
        })

        if (!template) {
            throw new Error('Failed to create template 🤦');
        }

        return { template }
    }
}