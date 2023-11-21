import { InMemoryWorkoutsRepository } from "../../repositories/in-memory/in-memory-workouts-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteWorkoutUseCase } from "./delete";

let workoutsRepository: InMemoryWorkoutsRepository
let sut: DeleteWorkoutUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        workoutsRepository = new InMemoryWorkoutsRepository()
        sut = new DeleteWorkoutUseCase(workoutsRepository)
    })

    it('should be able to delete user profile', async () => {
        const workoutToDelete = await workoutsRepository.create({
            name: 'test workout',
            timestamp: undefined,
            userId: 'user-01'
        })

        const isWorkoutDeleted = await sut.execute({ workoutId: workoutToDelete.id });

        expect(isWorkoutDeleted.success).toBe(true);

        const deletedWorkout = await workoutsRepository.findById(workoutToDelete.id);
        expect(deletedWorkout).toBeNull();
    });
});