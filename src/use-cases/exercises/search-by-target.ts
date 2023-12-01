import { ExercisesRepository } from '@/repositories/exercises-repository'
import { Exercise, Muscle } from '@prisma/client'

interface SearchExerciseByTargetsUseCaseRequest {
  query: Muscle
}

interface SearchExerciseByTargetsUseCaseResponse {
  exercises: Exercise[]
}

export class SearchExerciseByTargetsUseCase {
  constructor(private exercisesRepository: ExercisesRepository) { }

  async execute({
    query,
  }: SearchExerciseByTargetsUseCaseRequest): Promise<SearchExerciseByTargetsUseCaseResponse> {
    const exercises = await this.exercisesRepository.searchByTarget(query)

    return {
      exercises,
    }
  }
}
