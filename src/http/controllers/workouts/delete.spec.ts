import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Delete Workout Use Case (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete workout', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const workout = await prisma.workout.create({
            data: {
                name: 'test workout',
                timestamp: new Date(),
                userId: user.id,
            },
        })

        const deleteWorkoutResponse = await request(app.server)
            .delete(`/workouts/${workout.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(deleteWorkoutResponse.statusCode).toEqual(200);

        expect(deleteWorkoutResponse.body).toEqual(
            expect.objectContaining({
                message: 'Workout deleted successfully 👌',
            }),
        );
    });
});
