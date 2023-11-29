import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Metric History (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list the history of metrics', async () => {
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

        const response = await request(app.server)
            .get('/metrics/history')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.metrics).toEqual([
            expect.objectContaining({
                weight: 75,
                userId: user.id,
            }),
            expect.objectContaining({
                bodyFat: 20,
                userId: user.id,
            }),
        ])
    })
})
