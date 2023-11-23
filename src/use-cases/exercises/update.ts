import { ExercisesRepository } from '@/repositories/exercises-repository'
import { Equipment, Exercise } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateExerciseUseCaseRequest {
  id: string
  name: string,
  equipment: Equipment,
  unilateral: boolean,
}

interface UpdateExerciseUseCaseResponse {
  updatedExercise: Exercise
}

export class UpdateExerciseUseCase {
  constructor(private exercisesRepository: ExercisesRepository) { }

  async execute({
    id,
    name,
    equipment,
    unilateral
  }: UpdateExerciseUseCaseRequest): Promise<UpdateExerciseUseCaseResponse> {

    const exerciseToUpdate = await this.exercisesRepository.findById(id);

    if (!exerciseToUpdate) {
      throw new ResourceNotFoundError()
    }

    const data = { name, equipment, unilateral }

    const updatedExercise = await this.exercisesRepository.update(
      id,
      data
    )

    if (!updatedExercise) {
      throw new Error('Failed to update update exercise 🤦');
    }

    return { updatedExercise };
  }
}