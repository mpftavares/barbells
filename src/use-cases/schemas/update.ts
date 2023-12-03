import { SchemasRepository } from '@/repositories/schemas-repository'
import { Equipment, Schema } from '@prisma/client'
import { FailedToUpdateResourceError } from '../errors/failed-to-update-resource.error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateSchemaUseCaseRequest {
  id: string
  exerciseId: string
  number: number
  sets: number
  reps: string
}

interface UpdateSchemaUseCaseResponse {
  updatedSchema: Schema
}

export class UpdateSchemaUseCase {
  constructor(private schemasRepository: SchemasRepository) { }

  async execute({
    id,
    exerciseId,
    number,
    sets,
    reps
  }: UpdateSchemaUseCaseRequest): Promise<UpdateSchemaUseCaseResponse> {

    const schemaToUpdate = await this.schemasRepository.findById(id);

    if (!schemaToUpdate) {
      throw new ResourceNotFoundError()
    }

    const data = { exerciseId, number, sets, reps }

    const updatedSchema = await this.schemasRepository.update(
      id,
      data
    )

    if (!updatedSchema) {
      throw new FailedToUpdateResourceError()
    }

    return { updatedSchema };
  }
}