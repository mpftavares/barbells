import { SetsRepository } from '@/repositories/sets-repository'
import { Set } from '@prisma/client'
import { FailedToUpdateResourceError } from '../errors/failed-to-update-resource.error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateSetUseCaseRequest {
  id: string
  weight?: number
  reps: number
}

interface UpdateSetUseCaseResponse {
  updatedSet: Set
}

export class UpdateSetUseCase {
  constructor(private setsRepository: SetsRepository) { }

  async execute({
    id,
    weight,
    reps
  }: UpdateSetUseCaseRequest): Promise<UpdateSetUseCaseResponse> {

    const setToUpdate = await this.setsRepository.findById(id);

    if (!setToUpdate) {
      throw new ResourceNotFoundError()
    }

    const data = { weight, reps }

    const updatedSet = await this.setsRepository.update(
      id,
      data
    )

    if (!updatedSet) {
      throw new FailedToUpdateResourceError()
    }

    return { updatedSet };
  }
}