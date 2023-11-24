import { TemplatesRepository } from "@/repositories/templates-repository";
import { Template } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetTemplateUseCaseRequest {
    templateId: string
}

interface GetTemplateUseCaseResponse {
    template: Template
}

export class GetTemplateUseCase {

    constructor(private templatesRepository: TemplatesRepository) { }

    async execute({
        templateId
    }: GetTemplateUseCaseRequest): Promise<GetTemplateUseCaseResponse> {

        const template = await this.templatesRepository.findById(templateId);

        if (!template) {
            throw new ResourceNotFoundError();
        }

        return {
            template,
        };
    }
}
