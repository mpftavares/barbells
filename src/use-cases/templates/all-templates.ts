import { TemplatesRepository } from "@/repositories/templates-repository";
import { Template } from "@prisma/client";

interface GetAllTemplatesUseCaseRequest {
    userId: string
}

interface GetAllTemplatesUseCaseResponse {
    templates: Template[]
}

export class GetAllTemplatesUseCase {

    constructor(private templatesRepository: TemplatesRepository) { }

    async execute({
        userId
    }: GetAllTemplatesUseCaseRequest): Promise<GetAllTemplatesUseCaseResponse> {

        const templates = await this.templatesRepository.getAll(userId);

        return {
            templates
        };
    }
}
