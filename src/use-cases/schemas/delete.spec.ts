import { InMemorySchemasRepository } from "../../repositories/in-memory/in-memory-schemas-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteSchemaUseCase } from "./delete";

let schemasRepository: InMemorySchemasRepository
let sut: DeleteSchemaUseCase

describe('Get Schema Use Case', () => {
    beforeEach(() => {
        schemasRepository = new InMemorySchemasRepository()
        sut = new DeleteSchemaUseCase(schemasRepository)
    })

    it('should be able to delete schema', async () => {
        const schemaToDelete = await schemasRepository.create({
            templateId: "template-01",
            exerciseId: "exercise-01",
            number: 1,
            sets: 3,
            reps: '8-12'
        })

        const isSchemaDeleted = await sut.execute({ schemaId: schemaToDelete.id });
        expect(isSchemaDeleted.success).toBe(true);

        const deletedSchema = await schemasRepository.findById(schemaToDelete.id);
        expect(deletedSchema).toBeNull();
    });
});