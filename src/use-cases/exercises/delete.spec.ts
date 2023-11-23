import { InMemoryExercisesRepository } from "../../repositories/in-memory/in-memory-exercises-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteExerciseUseCase } from "./delete";

let exercisesRepository: InMemoryExercisesRepository
let sut: DeleteExerciseUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        exercisesRepository = new InMemoryExercisesRepository()
        sut = new DeleteExerciseUseCase(exercisesRepository)
    })

    it('should be able to delete user profile', async () => {
        const exerciseToDelete = await exercisesRepository.create({
            name: 'test exercise',
            equipment: 'dumbells',
            unilateral: true,
            userId: 'user-01'
        })

        const isExerciseDeleted = await sut.execute({ exerciseId: exerciseToDelete.id });
        expect(isExerciseDeleted.success).toBe(true);

        const deletedExercise = await exercisesRepository.findById(exerciseToDelete.id);
        expect(deletedExercise).toBeNull();
    });
});