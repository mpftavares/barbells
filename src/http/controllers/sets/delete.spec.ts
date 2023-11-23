import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Delete Set Use Case (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete set', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const workout = await prisma.workout.create({
            data: {
                name: 'test workout',
                timestamp: new Date,
                userId: user.id,
            },
        });

        const exercise = await prisma.exercise.create({
            data: {
                name: 'test exercise',
                equipment: 'dumbells',
                unilateral: true,
                userId: user.id
            },
        });

        const set = await prisma.set.create({
            data: {
                workoutId: workout.id,
                exerciseId: exercise.id,
                weight: 100,
                reps: 10,
            },
        })

        const deleteSetResponse = await request(app.server)
            .delete(`/sets/${set.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(deleteSetResponse.statusCode).toEqual(200);

        expect(deleteSetResponse.body).toEqual(
            expect.objectContaining({
                message: 'Set deleted successfully 👌',
            }),
        );
    });
});
