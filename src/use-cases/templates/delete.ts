import { TemplatesRepository } from "@/repositories/templates-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteTemplateUseCaseRequest {
    templateId: string
}

interface DeleteTemplateUseCaseResponse {
    success: boolean
}

export class DeleteTemplateUseCase {

    constructor(private templatesRepository: TemplatesRepository) { }

    async execute({
        templateId
    }: DeleteTemplateUseCaseRequest): Promise<DeleteTemplateUseCaseResponse> {
        const template = await this.templatesRepository.findById(templateId);

        if (!template) {
            throw new ResourceNotFoundError();
        }

        const isTemplateDeleted = await this.templatesRepository.delete(templateId);

        if (!isTemplateDeleted) {
            throw new Error('Failed to delete template 🤦');
        }

        return {
            success: isTemplateDeleted,
        };
    }
}
