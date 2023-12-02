import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { createExercise } from "@/utils/test/create-exercise";
import { createTemplate } from "@/utils/test/create-template";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Delete Template Use Case (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete template', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const exercise = await createExercise(user)

        const template = await createTemplate(user, exercise)

        const deleteTemplateResponse = await request(app.server)
            .delete(`/templates/${template.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(deleteTemplateResponse.statusCode).toEqual(200);

        expect(deleteTemplateResponse.body).toEqual(
            expect.objectContaining({
                message: 'Template deleted successfully 👌',
            }),
        );
    });
});
