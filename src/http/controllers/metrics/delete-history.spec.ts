import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Delete All User Metrics History (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete all user metrics history', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        await prisma.metric.createMany({
            data: [
                {
                    timestamp: new Date(),
                    weight: 75,
                    bodyFat: 25,
                    userId: user.id,
                },
                {
                    timestamp: new Date(),
                    weight: 70,
                    bodyFat: 20,
                    userId: user.id,
                },
            ],
        })

        const deleteMetricHistoryResponse = await request(app.server)
            .delete(`/metrics/history`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(deleteMetricHistoryResponse.statusCode).toEqual(200)

        expect(deleteMetricHistoryResponse.body).toEqual(
            expect.objectContaining({
                message: 'All user metrics deleted successfully 👌',
            }),
        )

        const metricsAfterDeletion = await prisma.metric.findMany({
            where: {
                userId: user.id,
            },
        })

        expect(metricsAfterDeletion).toHaveLength(0)
    })
})
