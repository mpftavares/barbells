import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { createExercise } from "@/utils/test/create-exercise";
import { createSchema } from "@/utils/test/create-schema";
import { createTemplate } from "@/utils/test/create-template";

describe('Update Schema Use Case (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to update schema', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const exercise = await createExercise(user)

        const template = await createTemplate(user, exercise)

        const schema = await createSchema(template, exercise)

        const updateSchemaResponse = await request(app.server)
            .put(`/schemas/${schema.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                templateId: template.id,
                number: 1,
                exerciseId: exercise.id,
                sets: 5,
                reps: '5',
            });

        expect(updateSchemaResponse.statusCode).toEqual(204);

        const updatedSchema = await prisma.schema.findFirstOrThrow({
            where: {
                id: schema.id,
            },
        });

        expect(updatedSchema.sets).toBe(5);
        expect(updatedSchema.reps).toBe("5");
    });
})