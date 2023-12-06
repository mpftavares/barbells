import { ExercisesRepository } from '@/repositories/exercises-repository'
import { Exercise, Muscle } from '@prisma/client'

interface SearchExerciseByTargetuseCaseRequest {
  muscle: Muscle
  userId: string
}

interface SearchExerciseByTargetuseCaseResponse {
  exercises: Exercise[]
}

export class SearchExerciseByTargetuseCase {
  constructor(private exercisesRepository: ExercisesRepository) { }

  async execute({
    muscle, userId
  }: SearchExerciseByTargetuseCaseRequest): Promise<SearchExerciseByTargetuseCaseResponse> {
    const exercises = await this.exercisesRepository.searchByTarget(muscle, userId)

    return {
      exercises,
    }
  }
}
