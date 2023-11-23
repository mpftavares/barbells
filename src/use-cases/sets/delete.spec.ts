import { InMemorySetsRepository } from "../../repositories/in-memory/in-memory-sets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteSetUseCase } from "./delete";

let setsRepository: InMemorySetsRepository
let sut: DeleteSetUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        setsRepository = new InMemorySetsRepository()
        sut = new DeleteSetUseCase(setsRepository)
    })

    it('should be able to delete user profile', async () => {
        const setToDelete = await setsRepository.create({
            workoutId: "workout-01",
            exerciseId: "exercise-01",
            weight: 100,
            reps: 10,
        })

        const isSetDeleted = await sut.execute({ setId: setToDelete.id });
        expect(isSetDeleted.success).toBe(true);

        const deletedSet = await setsRepository.findById(setToDelete.id);
        expect(deletedSet).toBeNull();
    });
});