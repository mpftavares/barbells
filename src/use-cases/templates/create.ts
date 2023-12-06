import { TemplatesRepository } from "@/repositories/templates-repository"
import { Template } from "@prisma/client"
import { FailedToCreateResourceError } from "../errors/failed-to-create-resource.error"
import { ResourceAlreadyExistsError } from "../errors/item-already-exists-error"

interface CreateTemplateUseCaseRequest {
    userId: string
    name: string
    schemas: {
        create: {
            exerciseId: string
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

        const templateAlreadyExists = await this.templatesRepository.doesTemplateAlreadyExist(name)

        if (templateAlreadyExists) {
            throw new ResourceAlreadyExistsError()
        }

        const template = await this.templatesRepository.create({
            userId,
            name,
            schemas
        })

        if (!template) {
            throw new FailedToCreateResourceError();
        }

        return { template }
    }
}