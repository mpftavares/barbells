import { ExercisesRepository } from '@/repositories/exercises-repository'
import { Exercise } from '@prisma/client'

interface SearchExercisesUseCaseRequest {
  query: string
}

interface SearchExercisesUseCaseResponse {
  exercises: Exercise[]
}

export class SearchExercisesUseCase {
  constructor(private exercisesRepository: ExercisesRepository) { }

  async execute({
    query,
  }: SearchExercisesUseCaseRequest): Promise<SearchExercisesUseCaseResponse> {
    const exercises = await this.exercisesRepository.searchByName(query)

    return {
      exercises,
    }
  }
}
