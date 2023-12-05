import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { createExercise } from "@/utils/test/create-exercise";

describe('Update Exercise Use Case (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to update exercise', async () => {

        const { token } = await createAndAuthenticateUser(app);

        const user = await prisma.user.findFirstOrThrow();

        const exercise = await createExercise(user)

        const updateExerciseResponse = await request(app.server)
            .put(`/exercises/${exercise.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'prettier exercise name',
                equipment: 'barbell',
                unilateral: false,
            });

        expect(updateExerciseResponse.statusCode).toEqual(204);

        const updatedExercise = await prisma.exercise.findFirstOrThrow({
            where: {
                id: exercise.id,
            },
        });

        expect(updatedExercise.name).toBe('prettier exercise name');
        expect(updatedExercise.equipment).toBe('barbell');
        expect(updatedExercise.unilateral).toBe(false);
    });
})