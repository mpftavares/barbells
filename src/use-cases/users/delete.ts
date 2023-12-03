import { UsersRepository } from "../../repositories/users-repository";
import { FailedToDeleteResourceError } from "../errors/failed-to-delete-resource.error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteUserProfileUseCaseRequest {
    userId: string;
}

interface DeleteUserProfileUseCaseResponse {
    success: boolean;
}

export class DeleteUserProfileUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({
        userId
    }: DeleteUserProfileUseCaseRequest): Promise<DeleteUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        const isUserDeleted = await this.usersRepository.delete(userId);

        if (!isUserDeleted) {
            throw new FailedToDeleteResourceError()
        }

        return {
            success: isUserDeleted,
        };
    }
}
