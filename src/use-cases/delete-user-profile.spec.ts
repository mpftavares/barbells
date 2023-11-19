
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteUserProfileUseCase } from "./delete-user-profile";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new DeleteUserProfileUseCase(usersRepository)
    })

    it('should be able to delete user profile', async () => {
        const userToDelete = await usersRepository.create({
            name: 'John Doe',
            email: 'john@example.com',
            passwordHash: await hash('123456', 6),
        })

        const isUserDeleted = await sut.execute({ userId: userToDelete.id });

        expect(isUserDeleted.success).toBe(true);

        const deletedUser = await usersRepository.findById(userToDelete.id);
        expect(deletedUser).toBeNull();
    });
});