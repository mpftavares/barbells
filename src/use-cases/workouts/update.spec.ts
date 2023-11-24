import { InMemoryWorkoutsRepository } from "@/repositories/in-memory/in-memory-workouts-repository";
import { beforeEach, expect, it } from "vitest";
import { UpdateWorkoutUseCase } from "./update";

let workoutsRepository: InMemoryWorkoutsRepository;
let sut: UpdateWorkoutUseCase;

beforeEach(() => {
    workoutsRepository = new InMemoryWorkoutsRepository();
    sut = new UpdateWorkoutUseCase(workoutsRepository);
});

it('should update workout name', async () => {

    const workoutToUpdate = await workoutsRepository.create({
        name: 'test workout',
        timestamp: new Date().toISOString(),
        userId: 'user-01'
    });

    const updatedName = 'prettier workout name';

    const { updatedWorkout } = await sut.execute({
        id: workoutToUpdate.id,
        name: updatedName,
    });

    expect(updatedWorkout).toBeDefined();
    expect(updatedWorkout.id).toBe(workoutToUpdate.id);
    expect(updatedWorkout.name).toBe(updatedName);
});

it('should update workout timestamp', async () => {

    const workoutToUpdate = await workoutsRepository.create({
        name: 'test workout',
        timestamp: new Date().toISOString(),
        userId: 'user-01'
    });

    const updatedTimestamp = new Date().toISOString()

    const { updatedWorkout } = await sut.execute({
        id: workoutToUpdate.id,
        timestamp: updatedTimestamp
    });

    expect(updatedWorkout).toBeDefined();
    expect(updatedWorkout.id).toBe(workoutToUpdate.id);
    expect(updatedWorkout.timestamp).toEqual(updatedTimestamp);
});
