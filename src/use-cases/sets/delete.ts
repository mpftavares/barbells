import { SetsRepository } from "@/repositories/sets-repository";
import { FailedToDeleteResourceError } from "../errors/failed-to-delete-resource.error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteSetUseCaseRequest {
    setId: string
}

interface DeleteSetUseCaseResponse {
    success: boolean
}

export class DeleteSetUseCase {

    constructor(private setsRepository: SetsRepository) { }

    async execute({
        setId
    }: DeleteSetUseCaseRequest): Promise<DeleteSetUseCaseResponse> {
        const set = await this.setsRepository.findById(setId);

        if (!set) {
            throw new ResourceNotFoundError();
        }

        const isSetDeleted = await this.setsRepository.delete(setId);

        if (!isSetDeleted) {
            throw new FailedToDeleteResourceError()
        }

        return {
            success: isSetDeleted,
        };
    }
}
