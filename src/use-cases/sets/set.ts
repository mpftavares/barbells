import { SetsRepository } from "@/repositories/sets-repository";
import { Set } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetSetUseCaseRequest {
    setId: string
}

interface GetSetUseCaseResponse {
    set: Set
}

export class GetSetUseCase {

    constructor(private setsRepository: SetsRepository) { }

    async execute({
        setId
    }: GetSetUseCaseRequest): Promise<GetSetUseCaseResponse> {

        const set = await this.setsRepository.findById(setId);

        if (!set) {
            throw new ResourceNotFoundError();
        }

        return {
            set,
        };
    }
}
