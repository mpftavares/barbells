import { ExercisesRepository } from '@/repositories/exercises-repository'
import { Exercise } from '@prisma/client'

interface SearchExerciseByNameUseCaseRequest {
  query: string
  userId: string
}

interface SearchExerciseByNameUseCaseResponse {
  exercises: Exercise[]
}

export class SearchExerciseByNameUseCase {
  constructor(private exercisesRepository: ExercisesRepository) { }

  async execute({
    query,
    userId
  }: SearchExerciseByNameUseCaseRequest): Promise<SearchExerciseByNameUseCaseResponse> {
    const exercises = await this.exercisesRepository.searchByName(query, userId)

    return {
      exercises,
    }
  }
}
