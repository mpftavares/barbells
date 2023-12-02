import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { createExercise } from "@/utils/test/create-exercise";
import { createSet } from "@/utils/test/create-set";
import { createWorkout } from "@/utils/test/create-workout";
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

        const exercise = await createExercise(user)

        const workout = await createWorkout(user, exercise)

        const set = await createSet(workout, exercise)

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
