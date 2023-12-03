import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { createExercise } from "@/utils/test/create-exercise";
import { createSchema } from "@/utils/test/create-schema";
import { createTemplate } from "@/utils/test/create-template";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Delete Schema Use Case (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete schema', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const exercise = await createExercise(user)

        const template = await createTemplate(user, exercise)

        const schema = await createSchema(template, exercise)

        const deleteSchemaResponse = await request(app.server)
            .delete(`/schemas/${schema.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(deleteSchemaResponse.statusCode).toEqual(200);

        expect(deleteSchemaResponse.body).toEqual(
            expect.objectContaining({
                message: 'Schema deleted successfully 👌',
            }),
        );
    });
});
