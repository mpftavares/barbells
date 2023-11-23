import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Delete Exercise Use Case (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete exercise', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const exercise = await prisma.exercise.create({
            data: {
                name: 'test exercise',
                equipment: 'dumbells',
                unilateral: true,
                userId: user.id
            },
        })

        const deleteExerciseResponse = await request(app.server)
            .delete(`/exercises/${exercise.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(deleteExerciseResponse.statusCode).toEqual(200);

        expect(deleteExerciseResponse.body).toEqual(
            expect.objectContaining({
                message: 'Exercise deleted successfully 👌',
            }),
        );
    });
});
