import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Delete All User Workouts History (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete all user workouts history', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        await prisma.workout.createMany({
            data: [
                {
                    name: 'test workout',
                    timestamp: new Date(),
                    userId: user.id,
                },
                {
                    name: 'another test workout',
                    timestamp: new Date(),
                    userId: user.id,
                },
            ],
        })

        const deleteWorkoutHistoryResponse = await request(app.server)
            .delete(`/workouts/history`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(deleteWorkoutHistoryResponse.statusCode).toEqual(200)

        expect(deleteWorkoutHistoryResponse.body).toEqual(
            expect.objectContaining({
                message: 'All user workouts deleted successfully 👌',
            }),
        )

        const workoutsAfterDeletion = await prisma.workout.findMany({
            where: {
                userId: user.id,
            },
        })

        expect(workoutsAfterDeletion).toHaveLength(0)
    })
})
