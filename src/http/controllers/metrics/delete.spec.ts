import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { createMetric } from "@/utils/test/create-metric";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Delete Metric Use Case (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to delete metric', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const metric = await createMetric(user)

        const deleteMetricResponse = await request(app.server)
            .delete(`/metrics/${metric.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(deleteMetricResponse.statusCode).toEqual(200);

        expect(deleteMetricResponse.body).toEqual(
            expect.objectContaining({
                message: 'Metric deleted successfully 👌',
            }),
        );
    });
});
