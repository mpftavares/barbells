import { InMemoryExercisesRepository } from "@/repositories/in-memory/in-memory-exercises-repository";
import { beforeEach, expect, it } from "vitest";
import { UpdateExerciseUseCase } from "./update";

let exercisesRepository: InMemoryExercisesRepository;
let sut: UpdateExerciseUseCase;

beforeEach(() => {
    exercisesRepository = new InMemoryExercisesRepository();
    sut = new UpdateExerciseUseCase(exercisesRepository);
});

it('should update exercise', async () => {

    const exerciseToUpdate = await exercisesRepository.create({
        name: 'test exercise',
        equipment: 'dumbbells',
        unilateral: true,
        userId: 'user-01'
    });

    const updatedName = 'prettier exercise name';

    const { updatedExercise } = await sut.execute({
        id: exerciseToUpdate.id,
        name: updatedName,
        equipment: 'barbell',
        unilateral: false
    });

    expect(updatedExercise).toBeDefined();
    expect(updatedExercise.id).toBe(exerciseToUpdate.id);
    expect(updatedExercise.name).toBe(updatedName);
    expect(updatedExercise.unilateral).toBe(false);
});
