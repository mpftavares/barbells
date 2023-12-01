import { ExercisesRepository } from '@/repositories/exercises-repository'
import { Exercise } from '@prisma/client'

interface SearchExerciseByNamesUseCaseRequest {
  query: string
}

interface SearchExerciseByNamesUseCaseResponse {
  exercises: Exercise[]
}

export class SearchExerciseByNamesUseCase {
  constructor(private exercisesRepository: ExercisesRepository) { }

  async execute({
    query,
  }: SearchExerciseByNamesUseCaseRequest): Promise<SearchExerciseByNamesUseCaseResponse> {
    const exercises = await this.exercisesRepository.searchByName(query)

    return {
      exercises,
    }
  }
}
