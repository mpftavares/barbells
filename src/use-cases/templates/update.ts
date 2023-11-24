import { TemplatesRepository } from '@/repositories/templates-repository'
import { Template } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateTemplateUseCaseRequest {
  id: string
  name: string
}

interface UpdateTemplateUseCaseResponse {
  updatedTemplate: Template
}

export class UpdateTemplateUseCase {
  constructor(private templatesRepository: TemplatesRepository) { }

  async execute({
    id,
    name,
  }: UpdateTemplateUseCaseRequest): Promise<UpdateTemplateUseCaseResponse> {

    const templateToUpdate = await this.templatesRepository.findById(id);

    if (!templateToUpdate) {
      throw new ResourceNotFoundError()
    }

    const data = { name }

    const updatedTemplate = await this.templatesRepository.update(
      id,
      data
    )

    if (!updatedTemplate) {
      throw new Error('Failed to update update template 🤦');
    }

    return { updatedTemplate };
  }
}