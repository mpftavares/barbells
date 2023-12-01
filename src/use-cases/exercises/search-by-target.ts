import { ExercisesRepository } from '@/repositories/exercises-repository'
import { Exercise, Muscle } from '@prisma/client'

interface SearchExerciseByTargetuseCaseRequest {
  query: Muscle
  userId: string
}

interface SearchExerciseByTargetuseCaseResponse {
  exercises: Exercise[]
}

export class SearchExerciseByTargetuseCase {
  constructor(private exercisesRepository: ExercisesRepository) { }

  async execute({
    query, userId
  }: SearchExerciseByTargetuseCaseRequest): Promise<SearchExerciseByTargetuseCaseResponse> {
    const exercises = await this.exercisesRepository.searchByTarget(query, userId)

    return {
      exercises,
    }
  }
}
