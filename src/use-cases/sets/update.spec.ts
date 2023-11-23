import { InMemorySetsRepository } from "@/repositories/in-memory/in-memory-sets-repository";
import { beforeEach, expect, it } from "vitest";
import { UpdateSetUseCase } from "./update";

let setsRepository: InMemorySetsRepository;
let sut: UpdateSetUseCase;

beforeEach(() => {
    setsRepository = new InMemorySetsRepository();
    sut = new UpdateSetUseCase(setsRepository);
});

it('should update set weight', async () => {

    const setToUpdate = await setsRepository.create({
        workoutId: "workout-01",
        exerciseId: "exercise-01",
        weight: 100,
        reps: 10,
    });

    const { updatedSet } = await sut.execute({
        id: setToUpdate.id,
        weight: 120,
        reps: 8
    });

    expect(updatedSet).toBeDefined();
    expect(updatedSet.id).toBe(setToUpdate.id);
    expect(updatedSet.weight).toBe(120);
    expect(updatedSet.reps).toBe(8);
});
