import { InMemoryTemplatesRepository } from "@/repositories/in-memory/in-memory-templates-repository";
import { randomUUID } from "crypto";
import { beforeEach, expect, it } from "vitest";
import { UpdateTemplateUseCase } from "./update";

let templatesRepository: InMemoryTemplatesRepository;
let sut: UpdateTemplateUseCase;

beforeEach(() => {
    templatesRepository = new InMemoryTemplatesRepository();
    sut = new UpdateTemplateUseCase(templatesRepository);
});

it('should update template name', async () => {

    const templateToUpdate = await templatesRepository.create({
        name: 'test template',
        userId: randomUUID(),
    });

    const updatedName = 'prettier template name';

    const { updatedTemplate } = await sut.execute({
        id: templateToUpdate.id,
        name: updatedName,
    });

    expect(updatedTemplate).toBeDefined();
    expect(updatedTemplate.id).toBe(templateToUpdate.id);
    expect(updatedTemplate.name).toBe(updatedName);
});