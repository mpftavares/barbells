import { TemplatesRepository } from "@/repositories/templates-repository"
import { Template } from "@prisma/client"

interface CreateTemplateUseCaseRequest {
    userId: string
    name: string
    schemas: {
        create: {
            exerciseId: string
            number: number
            sets: number
            reps: string
        }[];
    }
}

interface CreateTemplateUseCaseResponse {
    template: Template
}

export class CreateTemplateUseCase {

    constructor(private templatesRepository: TemplatesRepository) { }

    async execute({
        userId,
        name,
        schemas
    }: CreateTemplateUseCaseRequest): Promise<CreateTemplateUseCaseResponse> {

        const template = await this.templatesRepository.create({
            userId,
            name,
            schemas
        })

        if (!template) {
            throw new Error('Failed to create template 🤦');
        }

        return { template }
    }
}