import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { createWorkout } from "@/utils/test/create-workout";
import { createExercise } from "@/utils/test/create-exercise";
import { createSet } from "@/utils/test/create-set";

describe('Update Set Use Case (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to update set', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const exercise = await createExercise(user)

        const workout = await createWorkout(user, exercise)

        const set = await createSet(workout, exercise)

        const updateSetResponse = await request(app.server)
            .put(`/sets/${set.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: set.id,
                weight: 120,
                reps: 8,
            });

        expect(updateSetResponse.statusCode).toEqual(204);

        const updatedSet = await prisma.set.findFirstOrThrow({
            where: {
                id: set.id,
            },
        });

        expect(updatedSet.weight).toBe(120);
        expect(updatedSet.reps).toBe(8);
    });
})