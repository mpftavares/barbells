import { InMemoryWorkoutsRepository } from '@/repositories/in-memory/in-memory-workouts-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteUserWorkoutsHistoryUseCase } from './delete-history';

let workoutsRepository: InMemoryWorkoutsRepository;
let sut: DeleteUserWorkoutsHistoryUseCase;

describe('Delete User Workouts History Use Case', () => {
    beforeEach(() => {
        workoutsRepository = new InMemoryWorkoutsRepository();
        sut = new DeleteUserWorkoutsHistoryUseCase(workoutsRepository);
    });

    it('should be able to delete all user workouts', async () => {

        await workoutsRepository.create({
            name: 'test workout',
            timestamp: undefined,
            userId: 'user-01'
        });

        await workoutsRepository.create({
            name: 'another test workout',
            timestamp: undefined,
            userId: 'user-01'
        });

        const isDeleted = await sut.execute({ userId: 'user-01' });

        expect(isDeleted.success).toBe(true);

        const workouts = await workoutsRepository.findByUserId('user-01');

        expect(workouts).toHaveLength(0);
    });
});
