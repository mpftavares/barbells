import { SetsRepository } from '@/repositories/sets-repository'
import { Set } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateSetUseCaseRequest {
  id: string
  weight: number
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
      throw new Error('Failed to update update set 🤦');
    }

    return { updatedSet };
  }
}