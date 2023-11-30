import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('User Workout History (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list workout history', async () => {
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

        const response = await request(app.server)
            .get('/workouts/history')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.workouts).toEqual([
            expect.objectContaining({
                name: 'test workout',
                userId: user.id,
            }),
            expect.objectContaining({
                name: 'another test workout',
                userId: user.id,
            }),
        ])
    })
})
