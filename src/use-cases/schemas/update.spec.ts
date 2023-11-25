import { InMemorySchemasRepository } from "@/repositories/in-memory/in-memory-schemas-repository";
import { beforeEach, expect, it } from "vitest";
import { UpdateSchemaUseCase } from "./update";

let schemasRepository: InMemorySchemasRepository;
let sut: UpdateSchemaUseCase;

beforeEach(() => {
    schemasRepository = new InMemorySchemasRepository();
    sut = new UpdateSchemaUseCase(schemasRepository);
});

it('should update schema', async () => {

    const schemaToUpdate = await schemasRepository.create({
        templateId: "template-01",
        exerciseId: "exercise-01",
        number: 1,
        sets: 3,
        reps: '8-12'
    });


    const { updatedSchema } = await sut.execute({
        id: schemaToUpdate.id,
        exerciseId: "exercise-01",
        number: 1,
        sets: 5,
        reps: '5'
    });

    expect(updatedSchema).toBeDefined();
    expect(updatedSchema.id).toBe(schemaToUpdate.id);
    expect(updatedSchema.sets).toBe(5);
    expect(updatedSchema.reps).toBe("5");
});
