import { ExercisesRepository } from '@/repositories/exercises-repository'
import { Exercise, Muscle } from '@prisma/client'

interface SearchExerciseByTargetuseCaseRequest {
  query: Muscle
}

interface SearchExerciseByTargetuseCaseResponse {
  exercises: Exercise[]
}

export class SearchExerciseByTargetuseCase {
  constructor(private exercisesRepository: ExercisesRepository) { }

  async execute({
    query,
  }: SearchExerciseByTargetuseCaseRequest): Promise<SearchExerciseByTargetuseCaseResponse> {
    const exercises = await this.exercisesRepository.searchByTarget(query)

    return {
      exercises,
    }
  }
}
