import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { createMetric } from "@/utils/test/create-metric";

describe('Update Metric Use Case (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to update metric', async () => {

        const { token } = await createAndAuthenticateUser(app);

        const user = await prisma.user.findFirstOrThrow();

        const metric = await createMetric(user)

        const newTimestamp = new Date('2023-07-15T08:30:00Z');

        const updateMetricResponse = await request(app.server)
            .put(`/metrics/${metric.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                timestamp: newTimestamp,
                weight: 70,
            });

        expect(updateMetricResponse.statusCode).toEqual(204);

        const updatedMetric = await prisma.metric.findFirstOrThrow({
            where: {
                id: metric.id,
            },
        });

        expect(updatedMetric.weight).toBe(70);
        expect(updatedMetric.timestamp).toEqual(newTimestamp);

    });
})