import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { DeleteUserProfileUseCase } from "../delete-user-profile"


export function makeDeleteUserProfileUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const deleteUserProfileUseCase = new DeleteUserProfileUseCase(usersRepository)

    return deleteUserProfileUseCase
}