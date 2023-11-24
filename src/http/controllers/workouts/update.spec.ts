import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { createWorkout } from "@/utils/test/create-workout";

describe('Update Workout Use Case (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to update workout', async () => {

        const { token } = await createAndAuthenticateUser(app);

        const user = await prisma.user.findFirstOrThrow();

        const workout = await createWorkout(user)

        const newTimestamp = new Date('2023-07-15T08:30:00Z');

        const updateWorkoutResponse = await request(app.server)
            .put(`/workouts/${workout.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: workout.id,
                name: 'prettier workout name',
                timestamp: newTimestamp
            });

        expect(updateWorkoutResponse.statusCode).toEqual(204);

        const updatedWorkout = await prisma.workout.findFirstOrThrow({
            where: {
                id: workout.id,
            },
        });

        expect(updatedWorkout.name).toBe('prettier workout name');
        expect(updatedWorkout.timestamp).toEqual(newTimestamp);

    });
})