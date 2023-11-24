import { InMemoryTemplatesRepository } from "../../repositories/in-memory/in-memory-templates-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteTemplateUseCase } from "./delete";
import { randomUUID } from "crypto";

let templatesRepository: InMemoryTemplatesRepository
let sut: DeleteTemplateUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        templatesRepository = new InMemoryTemplatesRepository()
        sut = new DeleteTemplateUseCase(templatesRepository)
    })

    it('should be able to delete user profile', async () => {
        const templateToDelete = await templatesRepository.create({
            name: 'test template',
            userId: randomUUID(),
        })

        const isTemplateDeleted = await sut.execute({ templateId: templateToDelete.id });
        expect(isTemplateDeleted.success).toBe(true);

        const deletedTemplate = await templatesRepository.findById(templateToDelete.id);
        expect(deletedTemplate).toBeNull();
    });
});